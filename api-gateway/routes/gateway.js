const express = require('express');
const router = express.Router();
const serviceRegistry = require('../services/serviceRegistry');
const routingService = require('../services/routingService');
const loadBalancer = require('../services/loadBalancer');
const healthChecker = require('../utils/healthChecker');
const { validateServiceRegistration } = require('../middleware/authMiddleware');

// Health check endpoint
router.get('/health', async (req, res) => {
    try {
        const healthStatus = await healthChecker.aggregateHealthCheck();
        res.status(200).json(healthStatus);
    } catch (error) {
        res.status(500).json({ error: 'Health check failed' });
    }
});

// List registered services and their status
router.get('/services', (req, res) => {
    const services = serviceRegistry.getServices();
    res.status(200).json(services);
});

// Register new microservice
router.post('/services/register', validateServiceRegistration, (req, res) => {
    const { name, url } = req.body;
    serviceRegistry.registerService(name, url);
    res.status(201).json({ message: 'Service registered successfully' });
});

// List all available API routes
router.get('/routes', (req, res) => {
    const routes = routingService.getAvailableRoutes();
    res.status(200).json(routes);
});

// Gateway performance metrics
router.get('/metrics', (req, res) => {
    const metrics = loadBalancer.getMetrics();
    res.status(200).json(metrics);
});

module.exports = router;