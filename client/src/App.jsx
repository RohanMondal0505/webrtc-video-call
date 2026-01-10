import Controls from "./components/Controls";
import Notifications from "./components/Notifications";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./components/VideoPlayer";

function App() {
	return (
		<div className="app">
			<header className="app-header">
				<div className="logo">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<polygon points="23 7 16 12 23 17 23 7"></polygon>
						<rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
					</svg>
					<h1>WebRTC Video Call</h1>
				</div>
			</header>

			<div className="main-content">
				<div className="video-section">
					<VideoPlayer />
					<Controls />
				</div>
				<Sidebar />
			</div>

			<Notifications />
		</div>
	);
}

export default App;
