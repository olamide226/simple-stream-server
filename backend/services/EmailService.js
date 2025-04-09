// backend/services/EmailService.js
const axios = require('axios');

class EmailService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.mailtrapUrl = 'https://send.api.mailtrap.io/api/send';
    }

    async sendContactEmail({ name, email, message }) {
        try {
            console.debug('Sending email with the following data:', {
                name,
                email,
                message
            });
            const response = await axios.post(this.mailtrapUrl, {
                from: {
                    email: "hello@ruac.tech",
                    name: "Contact Form"
                },
                to: [{
                    email: "info@ruac.tech"
                }],
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                category: "Contact Form"
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Email sending error:', error);
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }
}

module.exports = EmailService;
