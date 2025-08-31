const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const winston = require('winston');
const gatewayRoutes = require('./routes/gateway');
const errorHandler = require('./middleware/errorHandler');
const { registerServices } = require('./services/serviceRegistry');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Register services
registerServices();

// API routes
app.use('/api', gatewayRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  winston.info(`API Gateway is running on http://localhost:${PORT}`);
});