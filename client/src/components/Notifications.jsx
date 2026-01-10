import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext);

	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div className="notification-container">
					<div className="notification-card">
						<div className="notification-header">
							<div className="caller-avatar">{call.name?.charAt(0)?.toUpperCase() || "U"}</div>
							<div className="caller-info">
								<h3>{call.name || "Someone"} is calling...</h3>
								<p>Incoming video call</p>
							</div>
						</div>
						<div className="notification-actions">
							<button className="btn btn-accept" onClick={answerCall}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
								</svg>
								Accept
							</button>
							<button className="btn btn-decline" onClick={() => window.location.reload()}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M23 1L1 23M1 1l22 22"></path>
								</svg>
								Decline
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Notifications;
