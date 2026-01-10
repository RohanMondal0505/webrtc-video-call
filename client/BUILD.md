# WebRTC Video Call - Build & Deployment Guide

## Environment Configuration

This project uses environment variables to configure the Socket.IO server URL for different environments.

### Environment Files

-   `.env.development` - Used when running `npm run dev` (localhost)
-   `.env.production` - Used when running `npm run build` (production URL)
-   `.env.example` - Template file for reference

### Environment Variables

-   `VITE_SOCKET_URL` - The URL of your Socket.IO server

## Development

Run the development server with local backend:

```bash
npm run dev
```

This will use `http://localhost:6200` as the socket server URL.

## Production Build

Build for production deployment:

```bash
npm run build
```

This will:

1. Use `https://webrtc.rohans.uno` as the socket server URL
2. Create an optimized production build in the `dist` folder
3. Minify and bundle all assets

## Preview Production Build

To test the production build locally:

```bash
npm run preview
```

## Deployment

After building, deploy the contents of the `dist` folder to your hosting service.

### Important Notes

-   Make sure your production server at `https://webrtc.rohans.uno` is running and accessible
-   The server must have CORS configured to allow requests from your frontend domain
-   Ensure SSL certificates are properly configured for HTTPS
