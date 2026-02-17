import { useState } from "react";
import axios from "axios";

function CreatePoll() {

const [question, setQuestion] = useState("");
const [options, setOptions] = useState(["", ""]);
const [pollLink, setPollLink] = useState("");
const handleOptionChange = (index, value) => {
  const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    };
    const createPoll = async () => {
    try {
        const response = 
        await axios.post( "https://poll-backend-aqi0.onrender.com/api/polls/create",
            { question,options }
        );
        const link = `${window.location.origin}/poll/${response.data.pollId}`;
        setPollLink(link);
    }
    catch (error) {
        alert("Failed to create poll");
    } };
    return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-4 text-center">
        Create a Poll
    </h2>
    <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Enter your question"
        onChange={(e) => setQuestion(e.target.value)}
    />
    {options.map((option, index) => (
        <input
            key={index}
            className="w-full border p-2 mb-3 rounded"
            placeholder={`Option ${index + 1}`}
            onChange={(e) =>
                handleOptionChange(index, e.target.value)
            }
        />
    ))}
    <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={createPoll}
    >
        Create Poll
    </button>
    {pollLink && (

        <div className="mt-4 text-sm">

            Share link:

            <p className="text-blue-600 break-all">
                {pollLink}
            </p>
        </div>
    )}
    </div>
    </div>
    );
}
export default CreatePoll;
