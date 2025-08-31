const axios = require('axios');
const { serviceRegistry } = require('./serviceRegistry');
const { loadBalancer } = require('./loadBalancer');

const routeRequest = async (req, res) => {
    const { originalUrl, method } = req;
    const service = serviceRegistry.getServiceByRoute(originalUrl);

    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }

    try {
        const targetUrl = loadBalancer.getServiceUrl(service);
        const response = await axios({
            method,
            url: targetUrl + originalUrl,
            data: req.body,
            headers: {
                ...req.headers,
                'X-Forwarded-For': req.ip,
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error routing request:', error);
        res.status(error.response ? error.response.status : 500).json({
            error: 'Error processing request',
            details: error.message,
        });
    }
};

const transformRequest = (req) => {
    // Implement request transformation logic if needed
    return req;
};

const formatResponse = (response) => {
    // Implement response formatting logic if needed
    return response;
};

module.exports = {
    routeRequest,
    transformRequest,
    formatResponse,
};