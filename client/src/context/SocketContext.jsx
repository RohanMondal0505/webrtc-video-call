import { createContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:5001");

const SocketProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();
	const [name, setName] = useState("");
	const [call, setCall] = useState({});
	const [me, setMe] = useState("");
	const [userName, setUserName] = useState("");
	const [otherUser, setOtherUser] = useState("");
	const [myVdoStatus, setMyVdoStatus] = useState(true);
	const [userVdoStatus, setUserVdoStatus] = useState();
	const [myMicStatus, setMyMicStatus] = useState(true);
	const [userMicStatus, setUserMicStatus] = useState();
	const [screenShare, setScreenShare] = useState(false);

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
	const screenTrackRef = useRef();

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
			setStream(currentStream);
			if (myVideo.current) {
				myVideo.current.srcObject = currentStream;
			}
		});

		socket.on("me", (id) => setMe(id));

		socket.on("callUser", ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
		});

		socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
			if (currentMediaStatus !== null && currentMediaStatus !== undefined) {
				switch (type) {
					case "video":
						setUserVdoStatus(currentMediaStatus);
						break;
					case "mic":
						setUserMicStatus(currentMediaStatus);
						break;
					default:
						setUserMicStatus(currentMediaStatus[0]);
						setUserVdoStatus(currentMediaStatus[1]);
						break;
				}
			}
		});

		socket.on("callEnded", () => {
			setCallEnded(true);
			connectionRef.current?.destroy();
			window.location.reload();
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);
		setOtherUser(call.from);
		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: call.from, userName: name, type: "both", myMediaStatus: [myMicStatus, myVdoStatus] });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });
		setOtherUser(id);

		peer.on("signal", (data) => {
			socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on("callAccepted", ({ signal, userName }) => {
			setCallAccepted(true);
			setUserName(userName);
			peer.signal(signal);
			socket.emit("updateMyMedia", {
				type: "both",
				currentMediaStatus: [myMicStatus, myVdoStatus],
			});
		});

		connectionRef.current = peer;
	};

	const updateVideo = () => {
		setMyVdoStatus((currentStatus) => {
			socket.emit("updateMyMedia", {
				type: "video",
				currentMediaStatus: !currentStatus,
			});
			stream.getVideoTracks()[0].enabled = !currentStatus;
			return !currentStatus;
		});
	};

	const updateMic = () => {
		setMyMicStatus((currentStatus) => {
			socket.emit("updateMyMedia", {
				type: "mic",
				currentMediaStatus: !currentStatus,
			});
			stream.getAudioTracks()[0].enabled = !currentStatus;
			return !currentStatus;
		});
	};

	const handleScreenSharing = () => {
		if (!screenShare) {
			navigator.mediaDevices
				.getDisplayMedia({ cursor: true })
				.then((currentStream) => {
					const screenTrack = currentStream.getTracks()[0];

					// Replace video track
					connectionRef.current.replaceTrack(
						connectionRef.current.streams[0].getTracks().find((track) => track.kind === "video"),
						screenTrack,
						stream
					);

					// Update local video
					screenTrack.onended = () => {
						connectionRef.current.replaceTrack(
							screenTrack,
							connectionRef.current.streams[0].getTracks().find((track) => track.kind === "video"),
							stream
						);

						myVideo.current.srcObject = stream;
						setScreenShare(false);
					};

					myVideo.current.srcObject = currentStream;
					screenTrackRef.current = screenTrack;
					setScreenShare(true);
				})
				.catch((error) => {
					console.log("No stream for sharing");
				});
		} else {
			screenTrackRef.current.onended();
		}
	};

	const leaveCall = () => {
		setCallEnded(true);
		connectionRef.current.destroy();
		socket.emit("endCall", { id: otherUser });
		window.location.reload();
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
				updateVideo,
				updateMic,
				myVdoStatus,
				myMicStatus,
				userVdoStatus,
				userMicStatus,
				handleScreenSharing,
				screenShare,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { SocketContext, SocketProvider };
