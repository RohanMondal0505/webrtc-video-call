import { useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocketContext } from "../context/SocketContext";

const Sidebar = () => {
	const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
	const [idToCall, setIdToCall] = useState("");
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<h2 className="sidebar-title">Account Info</h2>

				<div className="form-group">
					<label>Your Name</label>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="input-field" />
				</div>

				<div className="form-group">
					<label>Your ID</label>
					<div className="id-display">
						<input type="text" value={me} readOnly className="input-field" />
						<CopyToClipboard text={me} onCopy={handleCopy}>
							<button className="btn-copy" title="Copy ID">
								{copied ? (
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								) : (
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								)}
							</button>
						</CopyToClipboard>
					</div>
					{copied && <span className="copy-feedback">Copied!</span>}
				</div>

				<div className="divider"></div>

				<h2 className="sidebar-title">Make a Call</h2>

				<div className="form-group">
					<label>ID to Call</label>
					<input
						type="text"
						value={idToCall}
						onChange={(e) => setIdToCall(e.target.value)}
						placeholder="Paste ID here"
						className="input-field"
					/>
				</div>

				{callAccepted && !callEnded ? (
					<button className="btn btn-end" onClick={leaveCall}>
						End Call
					</button>
				) : (
					<button className="btn btn-call" onClick={() => callUser(idToCall)} disabled={!idToCall}>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
						Call
					</button>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
