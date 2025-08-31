const services = [
    {
        name: 'User Service',
        url: 'http://user-service:3000',
        healthCheck: '/health',
        status: 'unknown'
    },
    {
        name: 'Order Service',
        url: 'http://order-service:3000',
        healthCheck: '/health',
        status: 'unknown'
    },
    {
        name: 'Product Service',
        url: 'http://product-service:3000',
        healthCheck: '/health',
        status: 'unknown'
    }
];

module.exports = services;