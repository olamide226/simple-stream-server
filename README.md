# Simple Stream Server

A real-time streaming platform with interactive features including live chat, reactions, and contact form functionality.

## Features

- Live video streaming via RTMP/HLS
- Real-time chat with Socket.IO
- Viewer reaction system
- Responsive design

## Setup

### Docker Setup (Recommended)

1. Install Docker and Docker Compose
2. Clone this repository
3. Run: `docker-compose up -d`
4. Access the application at `http://localhost:8080`
5. Stream to: `rtmp://localhost:1935/live/stream-key`

The Docker setup includes:
- Nginx with RTMP module for streaming
- Node.js backend for real-time features
- Pre-configured frontend

### Manual Setup

#### Requirements
- Node.js 16+
- Nginx with RTMP module
- FFmpeg (for streaming)

#### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
   - Runs on port 3000 by default

#### Frontend Setup
1. The frontend files are static HTML/CSS/JS
2. Serve them using any web server (Nginx, Apache, etc.)
3. Configure the backend URL in `frontend/index.html` if not using Docker

#### Nginx Configuration
1. Copy `nginx.conf` to your Nginx configuration
2. Restart Nginx

## Email Functionality

The contact form sends emails via Mailtrap:
1. Form collects: Name, Email, Message
2. Emails are sent to: info@ruac.tech
3. Configure Mailtrap API key in `backend/server.js`

## Usage

1. **Streaming**:
   - Stream to: `rtmp://localhost/live/stream-key`
   - Watch at: `http://localhost:8080`

2. **Interactive Features**:
   - Live chat with other viewers
   - Send reactions that appear on the stream

## Configuration

Key configuration files:
- `backend/constants.js` - Server settings
- `nginx.conf` - Streaming server configuration
- `docker-compose.yml` - Docker services

## Troubleshooting

- If streams don't appear, check:
  - RTMP server is running
  - HLS files are being generated in `/tmp/hls`
  - Nginx has proper permissions

- For email issues:
  - Verify Mailtrap API key is correct
  - Check backend logs for errors
