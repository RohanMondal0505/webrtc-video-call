import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const VideoPlayer = () => {
	const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, myVdoStatus, userVdoStatus } = useContext(SocketContext);

	return (
		<div className="video-container">
			{/* Local Video */}
			{stream && (
				<div className="video-card">
					<div className="video-wrapper">
						<video playsInline muted ref={myVideo} autoPlay className={`video ${!myVdoStatus ? "video-off" : ""}`} />
						{!myVdoStatus && (
							<div className="video-placeholder">
								<div className="avatar">{name?.charAt(0)?.toUpperCase() || "Y"}</div>
							</div>
						)}
					</div>
					<div className="video-label">
						<span>{name || "You"}</span>
						{!myVdoStatus && <span className="status-badge">Camera Off</span>}
					</div>
				</div>
			)}

			{/* Remote Video */}
			{callAccepted && !callEnded && (
				<div className="video-card">
					<div className="video-wrapper">
						<video playsInline ref={userVideo} autoPlay className={`video ${!userVdoStatus ? "video-off" : ""}`} />
						{!userVdoStatus && (
							<div className="video-placeholder">
								<div className="avatar">{call.name?.charAt(0)?.toUpperCase() || "U"}</div>
							</div>
						)}
					</div>
					<div className="video-label">
						<span>{call.name || "User"}</span>
						{!userVdoStatus && <span className="status-badge">Camera Off</span>}
					</div>
				</div>
			)}
		</div>
	);
};

export default VideoPlayer;
