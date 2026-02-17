const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");
const { v4: uniqueId } = require("uuid");


router.post("/create", async (req, res) => {
  try {     const { question, options } = req.body;

        if (!question || options.length < 2) {
            return res.status(400).json({
                message: "Question and minimum 2 options required"
            });
        }
        const formattedOptions = options.map(option => ({
            text: option
        }));
        const poll = new Poll({
            question,
            options: formattedOptions
        });
        await poll.save();
        res.status(201).json({
            pollId: poll._id,
            message: "Poll created successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating poll",
            error: error.message
        });
    }
});
router.get("/:pollId", async (req, res) => {
    try { const poll = await Poll.findById(req.params.pollId);
         if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }
        res.json(poll);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching poll"
        });
    }
});
router.post("/:pollId/vote", async (req, res) => {

    try {

        const pollId = req.params.pollId;
      const optionIndex = req.body.optionIndex;
     
      let voterId = req.cookies.voterId;
        console.log("Poll ID:", voterId);
        console.log("Option Index:", optionIndex);
        if (!voterId) {

            voterId =uniqueId();

            res.cookie("voterId", voterId, {
                httpOnly: true,
                sameSite: "lax"
            });
        }
        const ipAddress =
            req.headers["Already there"] || req.socket.remoteAddress;
        
            const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({
                message: "Poll not found"
            });
        }
       
        const alreadyVoted = poll.voters.find(
            voter => voter.voterId === voterId
        );

        if (alreadyVoted) {
            return res.status(403).json({
                message: "You have already voted from this browser"
            });

        }
        if (optionIndex === undefined) {
            return res.status(400).json({
                message: "Option index required"
            });
        }
        const sameIp = poll.voters.filter(
            voter => voter.ipAddress === ipAddress
        );

        if (sameIp.length >= 2) {
            return res.status(403).json({
                message: "Vote limit reached from this network"
            });

        }
        poll.options[optionIndex].votes += 1;

        poll.voters.push({
             voterId, ipAddress
        });
        await poll.save();

        req.values.to(pollId).emit("pollUpdated", poll);

        res.json(poll);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Voting crashed"
        });

    }

});



module.exports = router;
