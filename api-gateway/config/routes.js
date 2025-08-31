const routes = [
    {
        method: 'GET',
        path: '/health',
        handler: 'healthCheckHandler',
    },
    {
        method: 'GET',
        path: '/services',
        handler: 'listServicesHandler',
    },
    {
        method: 'POST',
        path: '/services/register',
        handler: 'registerServiceHandler',
    },
    {
        method: 'GET',
        path: '/routes',
        handler: 'listRoutesHandler',
    },
    {
        method: 'GET',
        path: '/metrics',
        handler: 'metricsHandler',
    },
];

module.exports = routes;