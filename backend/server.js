const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pollRoutes = require("./routes/pollRoutes");

const app = express();
const server = http.createServer(app);

const values = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    req.values = values;
    next();
});

app.use("/api/polls", pollRoutes);


values.on("connection", (socket) => {

    socket.on("joinPoll", (pollId) => {
        socket.join(pollId);
    });

});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connected successfully");
})
.catch(err => {
    console.log("Database connection error:", err);
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
