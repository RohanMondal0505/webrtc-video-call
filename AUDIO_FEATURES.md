# Audio Notifications

This application includes audio notifications for better user experience during video calls.

## Features

### 🔔 Incoming Call Ringtone

-   **When**: Plays automatically when you receive an incoming call
-   **Sound**: A pleasant two-tone ringtone (800Hz and 1000Hz alternating)
-   **Duration**: Repeats every 2 seconds until the call is answered or missed
-   **Stop**: Automatically stops when you answer the call

### 🔊 Call End Beep

-   **When**: Plays when a call ends (either party hangs up)
-   **Sound**: A short descending beep (600Hz to 400Hz)
-   **Duration**: 0.3 seconds
-   **Purpose**: Provides audio feedback that the call has ended

## Technical Implementation

The audio notifications are implemented using the **Web Audio API**, which means:

-   ✅ No external audio files needed
-   ✅ Sounds are generated programmatically
-   ✅ Works in all modern browsers
-   ✅ Low latency and reliable playback
-   ✅ No additional dependencies

## How It Works

1. **Ringtone Generation**: Creates a buffer with alternating tones that repeat every 2 seconds
2. **Beep Generation**: Creates a short descending tone with fade-out envelope
3. **Integration**: Automatically triggered by socket events:
    - `callUser` event → Start ringtone
    - `answerCall` action → Stop ringtone
    - `callEnded` event → Play beep
    - `leaveCall` action → Play beep

## Browser Compatibility

The Web Audio API is supported in all modern browsers:

-   ✅ Chrome/Edge (all versions)
-   ✅ Firefox (all versions)
-   ✅ Safari (all versions)
-   ✅ Opera (all versions)

## Customization

You can customize the sounds by editing `/client/src/utils/audioNotification.js`:

-   Change frequencies (Hz values)
-   Adjust duration
-   Modify volume (envelope values)
-   Change repeat interval
