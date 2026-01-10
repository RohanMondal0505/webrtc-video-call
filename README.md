# WebRTC Video Call Application

A fully working peer-to-peer video calling application built with React and WebRTC, similar to Google Meet.

## Features

-   🎥 **1-to-1 Video Calling** - High-quality peer-to-peer video calls
-   🎤 **Audio Controls** - Mute/unmute microphone
-   📹 **Video Controls** - Turn camera on/off
-   🖥️ **Screen Sharing** - Share your screen with the other participant
-   🎨 **Premium UI** - Modern glassmorphism design with smooth animations
-   📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
-   🔗 **Easy Connection** - Share your ID to receive calls or paste someone's ID to call them

## Technology Stack

### Frontend

-   React 18
-   Vite
-   simple-peer (WebRTC wrapper)
-   socket.io-client
-   Custom CSS with glassmorphism effects

### Backend

-   Node.js
-   Express
-   Socket.io (signaling server)

## Installation & Setup

### 1. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

### 2. Start the Application

#### Start the Signaling Server (Terminal 1)

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

#### Start the React Client (Terminal 2)

```bash
cd client
npm run dev
```

The client will run on `http://localhost:3000`

## How to Use

### Making a Call

1. **Open the application** in your browser at `http://localhost:3000`
2. **Enter your name** in the "Your Name" field
3. **Copy your ID** by clicking the copy button next to "Your ID"
4. **Share your ID** with the person you want to call (via text, email, etc.)
5. **Get their ID** and paste it in the "ID to Call" field
6. **Click "Call"** to initiate the call

### Receiving a Call

1. **Open the application** in your browser
2. **Enter your name** in the "Your Name" field
3. **Share your ID** with the caller
4. **Wait for the incoming call notification**
5. **Click "Accept"** to answer the call

### During the Call

-   **Mute/Unmute**: Click the microphone button
-   **Camera On/Off**: Click the video camera button
-   **Share Screen**: Click the screen share button
-   **End Call**: Click the red phone button

## Project Structure

```
webrtc-video-call/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoPlayer.jsx    # Video display component
│   │   │   ├── Controls.jsx       # Call controls
│   │   │   ├── Notifications.jsx  # Incoming call alerts
│   │   │   └── Sidebar.jsx        # User info & call form
│   │   ├── context/
│   │   │   └── SocketContext.jsx  # WebRTC & Socket.io logic
│   │   ├── App.jsx
│   │   ├── App.css               # Premium styling
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── server/                    # Node.js signaling server
    ├── index.js              # Socket.io server
    └── package.json
```

## How It Works

### WebRTC Flow

1. **User A** opens the app and gets a unique Socket.io ID
2. **User A** shares their ID with **User B**
3. **User B** enters User A's ID and clicks "Call"
4. **Signaling**: Socket.io server relays the call signal from User B to User A
5. **User A** receives a notification and clicks "Accept"
6. **Peer Connection**: simple-peer establishes a direct WebRTC connection
7. **Media Streams**: Both users' video/audio streams are exchanged
8. **Communication**: Direct peer-to-peer communication begins

### Key Components

-   **SocketContext**: Manages WebRTC peer connections, media streams, and Socket.io events
-   **VideoPlayer**: Displays local and remote video streams with camera-off fallbacks
-   **Controls**: Provides buttons for mute, video toggle, screen share, and end call
-   **Sidebar**: User information and call initiation interface
-   **Notifications**: Incoming call alerts with accept/decline options

## Browser Compatibility

-   Chrome/Edge (recommended)
-   Firefox
-   Safari
-   Opera

**Note**: Camera and microphone permissions are required.

## Troubleshooting

### Camera/Microphone Not Working

-   Ensure you've granted browser permissions
-   Check if another application is using your camera/microphone
-   Try refreshing the page

### Connection Issues

-   Make sure the signaling server is running
-   Check that both users are connected to the server
-   Verify firewall settings aren't blocking WebRTC

### Video Not Showing

-   Check camera permissions
-   Ensure the camera is not being used by another application
-   Try toggling the video on/off

## License

MIT License - Feel free to use this project for learning or commercial purposes.

## Credits

Built with ❤️ using React, WebRTC, and Socket.io
