// backend/services/RecaptchaService.js
class RecaptchaService {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    }

    async verifyToken(token) {
        try {
            const response = await axios.post(this.verificationUrl, null, {
                params: {
                    secret: this.secretKey,
                    response: token
                }
            });

            return {
                success: response.data.success,
                score: response.data.score,
                errors: response.data['error-codes']
            };
        } catch (error) {
            console.error('reCAPTCHA verification error:', error);
            return {
                success: false,
                errors: ['Failed to verify reCAPTCHA token']
            };
        }
    }
}

module.exports = RecaptchaService;
