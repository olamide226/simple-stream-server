// backend/services/ChatService.js
const { MAX_CHAT_HISTORY, DEFAULT_USERNAME, MAX_MESSAGE_LENGTH } = require('../constants');

class ChatService {
    constructor(maxHistory = MAX_CHAT_HISTORY) {
        this.history = [];
        this.maxHistory = maxHistory;
    }

    addMessage(msgData) {
         // Basic validation and enrichment
         if (!msgData || typeof msgData.text !== 'string' || msgData.text.trim().length === 0) {
            return null; // Invalid message
         }

        const message = {
            id: Date.now() + Math.random().toString(16).slice(2),
            user: (msgData.user || DEFAULT_USERNAME).substring(0, 50), // Limit username length
            text: msgData.text.trim().substring(0, MAX_MESSAGE_LENGTH),
            timestamp: Date.now()
        };

        this.history.push(message);
        if (this.history.length > this.maxHistory) {
            this.history.shift(); // Remove oldest message
        }
        return message; // Return the processed message
    }

    getHistory() {
        return [...this.history]; // Return a copy
    }
}

// Export a singleton instance
module.exports = new ChatService();