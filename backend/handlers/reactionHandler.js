// backend/handlers/reactionHandler.js
const { EVENTS, ALLOWED_REACTIONS } = require('../constants');

function registerReactionHandlers(io, socket) {
    socket.on(EVENTS.REACTION, (reaction) => {
        console.log(`Reaction received: ${reaction} from ${socket.id}`);
        if (typeof reaction === 'string' && ALLOWED_REACTIONS.includes(reaction)) {
             const reactionData = {
                 id: Date.now() + Math.random().toString(16).slice(2),
                 type: reaction
             }
            io.emit(EVENTS.REACTION, reactionData); // Broadcast valid reaction
        } else {
            console.warn(`Invalid reaction rejected: ${reaction} from ${socket.id}`);
        }
    });
}

module.exports = registerReactionHandlers;