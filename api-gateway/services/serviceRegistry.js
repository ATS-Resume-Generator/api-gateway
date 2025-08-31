const services = new Map();

const registerService = (serviceName, serviceUrl) => {
    if (services.has(serviceName)) {
        throw new Error(`Service ${serviceName} is already registered.`);
    }
    services.set(serviceName, { url: serviceUrl, status: 'UP' });
};

const deregisterService = (serviceName) => {
    if (!services.has(serviceName)) {
        throw new Error(`Service ${serviceName} is not registered.`);
    }
    services.delete(serviceName);
};

const getServiceStatus = (serviceName) => {
    if (!services.has(serviceName)) {
        throw new Error(`Service ${serviceName} is not registered.`);
    }
    return services.get(serviceName);
};

const listServices = () => {
    return Array.from(services.entries()).map(([name, { url, status }]) => ({
        name,
        url,
        status,
    }));
};

const updateServiceStatus = (serviceName, status) => {
    if (!services.has(serviceName)) {
        throw new Error(`Service ${serviceName} is not registered.`);
    }
    services.get(serviceName).status = status;
};

module.exports = {
    registerService,
    deregisterService,
    getServiceStatus,
    listServices,
    updateServiceStatus,
};