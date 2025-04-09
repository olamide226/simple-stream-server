// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { PORT, EVENTS } = require('./constants');
const handleConnection = require('./handlers/connectionHandler');
const RecaptchaService = require('./services/RecaptchaService');
const EmailService = require('./services/EmailService');

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

// Initialize services
const recaptchaService = new RecaptchaService(process.env.RECAPTCHA_SECRET_KEY);
const emailService = new EmailService(process.env.MAILTRAP_API_KEY);

// Endpoint for sending emails
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message, 'g-recaptcha-response': token } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, message are required'
            });
        }

        // Verify reCAPTCHA token
        const recaptchaResult = await recaptchaService.verifyToken(token);
        if (!recaptchaResult.success) {
            return res.status(400).json({
                success: false,
                message: 'reCAPTCHA validation failed',
                errors: recaptchaResult.errors
            });
        }

        // Send email
        const emailResult = await emailService.sendContactEmail({ name, email, message });
        
        if (!emailResult.success) {
            throw new Error(emailResult.error);
        }

        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            data: emailResult.data
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
});
