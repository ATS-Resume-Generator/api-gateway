const axios = require('axios');

class LoadBalancer {
    constructor(services) {
        this.services = services; // Array of service instances
    }

    getService() {
        // Simple round-robin load balancing
        const service = this.services.shift();
        this.services.push(service);
        return service;
    }

    async forwardRequest(req) {
        const service = this.getService();
        const url = `${service.url}${req.originalUrl}`;

        try {
            const response = await axios({
                method: req.method,
                url: url,
                data: req.body,
                headers: {
                    ...req.headers,
                    'X-Forwarded-For': req.ip,
                },
                timeout: 5000, // Request timeout
            });
            return response.data;
        } catch (error) {
            throw new Error('Service unavailable');
        }
    }
}

module.exports = LoadBalancer;