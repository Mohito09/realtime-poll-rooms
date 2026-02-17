const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
        type: String,
        required: true
},
votes: {
        type: Number,
        default: 0
}
});
const pollSchema = new mongoose.Schema({
 question: {
        type: String,
        required: true
},
 options: {
        type: [optionSchema],
        validate: {
            validator: function(options) {
                return options.length >= 2;
            },
            message: "Poll must have at least 2 options"
        }
},
 voters: [
        {
            voterId: String,
            ipAddress: String
        }
]
}, { timestamps: true });

module.exports = mongoose.model("Poll", pollSchema);