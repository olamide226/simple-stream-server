// backend/handlers/connectionHandler.js
const { EVENTS } = require('../constants');
const viewerService = require('../services/ViewerService');
const chatService = require('../services/ChatService');
const registerChatHandlers = require('./chatHandler');
const registerReactionHandlers = require('./reactionHandler');

function handleConnection(io, socket) {
    const currentCount = viewerService.increment();
    io.emit(EVENTS.VIEWER_COUNT, currentCount);
    console.log(`User connected: ${socket.id}. Viewers: ${currentCount}`);

    // Send chat history to the newly connected user
    socket.emit(EVENTS.CHAT_HISTORY, chatService.getHistory());

    // Register handlers for specific events for this socket
    registerChatHandlers(io, socket, chatService);
    registerReactionHandlers(io, socket);

    // Handle disconnection
    socket.on(EVENTS.DISCONNECT, () => handleDisconnect(io, socket));
}

function handleDisconnect(io, socket) {
    const currentCount = viewerService.decrement();
    io.emit(EVENTS.VIEWER_COUNT, currentCount);
    console.log(`User disconnected: ${socket.id}. Viewers: ${currentCount}`);
}

module.exports = handleConnection;