const { createProxyMiddleware } = require('http-proxy-middleware');
const serviceRegistry = require('../services/serviceRegistry');

// Middleware to proxy requests to the appropriate microservices
const proxyMiddleware = (req, res, next) => {
    const service = serviceRegistry.getServiceByPath(req.path);
    
    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }

    const proxy = createProxyMiddleware({
        target: service.url,
        changeOrigin: true,
        pathRewrite: {
            [`^${service.path}`]: '', // Remove the service path from the request
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(502).json({ error: 'Bad Gateway' });
        },
    });

    return proxy(req, res, next);
};

module.exports = proxyMiddleware;