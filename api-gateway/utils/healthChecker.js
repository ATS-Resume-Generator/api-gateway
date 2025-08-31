const axios = require('axios');
const servicesConfig = require('../config/services');

async function checkServiceHealth(service) {
    try {
        const response = await axios.get(`${service.url}${service.healthCheckEndpoint}`);
        return { name: service.name, status: response.status === 200 ? 'healthy' : 'unhealthy' };
    } catch (error) {
        return { name: service.name, status: 'unhealthy' };
    }
}

async function aggregateHealthCheck() {
    const healthChecks = await Promise.all(servicesConfig.map(checkServiceHealth));
    return healthChecks;
}

module.exports = {
    checkServiceHealth,
    aggregateHealthCheck,
};