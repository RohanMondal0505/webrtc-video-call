import { Buffer } from "buffer";
import process from "process";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

// Make Buffer and process available globally
window.Buffer = Buffer;
window.process = process;

ReactDOM.createRoot(document.getElementById("root")).render(
	<SocketProvider>
		<App />
	</SocketProvider>
);
