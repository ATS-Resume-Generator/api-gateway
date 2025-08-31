const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000, // If the service takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
  resetTimeout: 30000 // After 30 seconds, try again
};

const circuitBreaker = new CircuitBreaker(async (serviceCall) => {
  return await serviceCall();
}, options);

circuitBreaker.fallback(() => {
  return { status: 'Service is currently unavailable. Please try again later.' };
});

const monitorService = (serviceCall) => {
  return circuitBreaker.fire(serviceCall);
};

module.exports = {
  monitorService
};