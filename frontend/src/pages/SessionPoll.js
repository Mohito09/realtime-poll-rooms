import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://poll-backend-aqi0.onrender.com");
function SessionPoll() {

const { pollId } = useParams();
const [poll, setPoll] = useState(null);
const [hasVoted, setHasVoted] = useState(false);

useEffect(() => {
   const fetchPoll = async () => {
      try {
      const response = 
      await axios.get(`https://poll-backend-aqi0.onrender.com/api/polls/${pollId}`);
       setPoll(response.data);
        }
        catch (error) {
            console.log("Error loading poll");
        }};
   fetchPoll();
  socket.emit("joinPoll", pollId);
  socket.on("pollUpdated", (updatedPoll) => {
    setPoll(updatedPoll);
    });
    return () => {
            socket.off("pollUpdated");
        };
    }, [pollId]);
    const handleVote = async (optionIndex) => {
        try {
            const response = 
            await axios.post(`https://poll-backend-aqi0.onrender.com/api/polls/${pollId}/vote`,
                {     optionIndex },
                {     withCredentials: true }
            );
            setPoll(response.data);
            setHasVoted(true);
        }
        catch (error) {
            console.log("voting error : " ,error);
            alert(error.response?.data?.message || "Voting failed");
        }
    };
    const getTotalVotes = () => {
        if (!poll) return 0;
        return poll.options.reduce(
            (total, option) => total + option.votes,0);
    };
    if (!poll) {
        return <div>Loading poll..</div>;
    }
    return (
        <div style={{ padding: "20px" }}>
            <h2>{poll.question}</h2>
            <p>Total votes: {getTotalVotes()}</p>
        <div>
    {poll.options.map((option, index) => {

     const totalVotes = getTotalVotes();

     const percentage =
    totalVotes === 0
        ? 0
        : Math.round((option.votes / totalVotes) * 100);

     return (

    <div key={index} className="mb-4">

        <button
            onClick={() => handleVote(index)}
            disabled={hasVoted}
            className="w-full text-left p-3 border rounded hover:bg-gray-100">
            {option.text}
        </button>
        <div className="w-full bg-gray-200 rounded h-4 mt-1">
            <div
                className="bg-blue-500 h-4 rounded"
                style={{
                    width: `${percentage}%`
                }}>
             </div>
         </div>
        <p className="text-sm text-gray-600">
            {option.votes} votes ({percentage}%)
        </p>
    </div>
);
})}
     </div>
      </div>
       );
}

export default SessionPoll;
