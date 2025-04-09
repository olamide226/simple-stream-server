// backend/handlers/chatHandler.js
const { EVENTS } = require('../constants');

function registerChatHandlers(io, socket, chatService) {
    socket.on(EVENTS.CHAT_MESSAGE, (msg) => {
        console.log(`Raw message received: ${JSON.stringify(msg)}`);
        const processedMessage = chatService.addMessage(msg);

        if (processedMessage) {
            console.log(`Broadcasting message: ${JSON.stringify(processedMessage)}`);
            io.emit(EVENTS.CHAT_MESSAGE, processedMessage); // Broadcast valid message
        } else {
            console.warn(`Invalid message rejected from ${socket.id}`);
            // Optionally notify sender of invalid message:
            // socket.emit('chat error', 'Invalid message format or content.');
        }
    });
}

module.exports = registerChatHandlers;