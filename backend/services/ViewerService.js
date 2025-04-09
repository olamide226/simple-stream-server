// backend/services/ViewerService.js
class ViewerService {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
        return this.count;
    }

    decrement() {
        this.count = Math.max(0, this.count - 1); // Prevent going below zero
        return this.count;
    }

    getCount() {
        return this.count;
    }
}

// Export a singleton instance
module.exports = new ViewerService();