import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const PORT = process.env.PORT || 6200;
const startTime = Date.now();

// Track active connections
let activeConnections = 0;

// API Router with prefix
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get("/health", (req, res) => {
	const uptime = Math.floor((Date.now() - startTime) / 1000);
	const hours = Math.floor(uptime / 3600);
	const minutes = Math.floor((uptime % 3600) / 60);
	const seconds = uptime % 60;

	res.status(200).json({
		status: "healthy",
		service: "WebRTC Signaling Server",
		version: "1.0.0",
		uptime: {
			seconds: uptime,
			formatted: `${hours}h ${minutes}m ${seconds}s`,
		},
		connections: {
			active: activeConnections,
		},
		timestamp: new Date().toISOString(),
		environment: process.env.NODE_ENV || "development",
	});
});

// Server info endpoint
apiRouter.get("/info", (req, res) => {
	res.status(200).json({
		name: "WebRTC Video Call Server",
		description: "Real-time video calling with WebRTC and Socket.IO",
		version: "1.0.0",
		features: ["Peer-to-peer video calling", "Audio/Video toggle", "Screen sharing", "Real-time signaling"],
		endpoints: {
			health: "/api/health",
			info: "/api/info",
		},
	});
});

// Mount API router with prefix
app.use("/api", apiRouter);

// Root endpoint
app.get("/", (req, res) => {
	res.send("WebRTC Signaling Server is running. Visit /api/health for status.");
});

io.on("connection", (socket) => {
	activeConnections++;
	console.log("New client connected:", socket.id);
	console.log("Active connections:", activeConnections);

	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		activeConnections--;
		console.log("Client disconnected:", socket.id);
		console.log("Active connections:", activeConnections);
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
