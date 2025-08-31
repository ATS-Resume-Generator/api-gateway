const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redisClient = require('../config/redisClient'); // Assuming you have a redisClient configured

const limiter = rateLimit({
    store: new RedisStore({
        client: redisClient,
        expiry: 60, // Time in seconds to keep the rate limit
    }),
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    keyGenerator: (req) => req.user ? req.user.id : req.ip, // Use user ID or IP for rate limiting
});

module.exports = limiter;