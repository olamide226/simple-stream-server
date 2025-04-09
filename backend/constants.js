// backend/constants.js
module.exports = {
    EVENTS: {
        CONNECTION: 'connection',
        DISCONNECT: 'disconnect',
        CHAT_MESSAGE: 'chat message',
        CHAT_HISTORY: 'chat history',
        REACTION: 'reaction',
        VIEWER_COUNT: 'viewer count',
    },
    MAX_CHAT_HISTORY: 50,
    ALLOWED_REACTIONS: ['👍', '❤️', '😂', '😮', '🎉'],
    DEFAULT_USERNAME: 'Anonymous',
    MAX_MESSAGE_LENGTH: 200,
    PORT: process.env.PORT || 3000,
};