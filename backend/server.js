// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const axios = require('axios');
const { PORT, EVENTS } = require('./constants');
const handleConnection = require('./handlers/connectionHandler');

// --- Server Setup ---
const app = express();
app.use(express.json()); // Add middleware to parse JSON bodies
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Configure properly for production
        methods: ["GET", "POST"]
    }
});

// --- WebSocket Connection Handling ---
// Delegate connection logic to the handler
io.on(EVENTS.CONNECTION, (socket) => {
    handleConnection(io, socket);
});

// --- Start Server ---
server.listen(PORT, () => {
    console.log(`Realtime server listening on *:${PORT}`);
});

// allow access control checks
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Optional: Basic HTTP endpoint for health check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Endpoint for sending emails via Mailtrap
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }
        
        const response = await axios.post('https://send.api.mailtrap.io/api/send', {
            from: {
                email: "hello@ruac.tech",
                name: "Contact Form"
            },
            to: [
                {
                    email: "info@ruac.tech"
                }
            ],
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            category: "Contact Form"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.MAILTRAP_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            data: response.data
        });
    } catch (error) {
        console.error('Error sending email:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.response?.data || error.message
        });
    }
});
