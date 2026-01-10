import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
	res.send("WebRTC Signaling Server is running");
});

io.on("connection", (socket) => {
	console.log("New client connected:", socket.id);

	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
		socket.broadcast.emit("callEnded");
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		console.log(`Call from ${from} to ${userToCall}`);
		io.to(userToCall).emit("callUser", {
			signal: signalData,
			from,
			name,
		});
	});

	socket.on("answerCall", ({ signal, to, userName, type, myMediaStatus }) => {
		console.log(`Call answered by ${userName} to ${to}`);
		io.to(to).emit("callAccepted", {
			signal,
			userName,
		});
		io.to(to).emit("updateUserMedia", {
			type,
			currentMediaStatus: myMediaStatus,
		});
	});

	socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
		console.log(`Media update - Type: ${type}, Status: ${currentMediaStatus}`);
		socket.broadcast.emit("updateUserMedia", {
			type,
			currentMediaStatus,
		});
	});

	socket.on("endCall", ({ id }) => {
		console.log(`Call ended with ${id}`);
		io.to(id).emit("callEnded");
	});
});

server.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
	console.log(`📡 WebRTC Signaling Server ready`);
});
