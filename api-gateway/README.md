# API Gateway Microservice

This project is an API Gateway microservice built with Node.js and Express.js. It serves as a central point for routing requests to various microservices, handling authentication, rate limiting, and monitoring.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Proxy requests to appropriate microservices
- Health check aggregation from all services
- Service registration and status listing
- Load balancing between multiple service instances
- Rate limiting per user/API key using Redis
- JWT token validation and forwarding
- CORS handling for frontend applications
- Request/response logging and monitoring
- Error handling middleware with standardized responses
- API versioning support
- Response caching for read-heavy endpoints
- Service discovery integration

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd api-gateway
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and configure your environment variables.

4. Start the server:
   ```
   npm start
   ```

## Usage

The API Gateway listens for incoming requests and routes them to the appropriate microservices based on the defined routes. Ensure that the microservices are running and registered with the gateway.

## API Endpoints

- `GET /health`: Aggregate health check from all services.
- `GET /services`: List registered services and their status.
- `POST /services/register`: Register a new microservice.
- `GET /routes`: List all available API routes.
- `GET /metrics`: Gateway performance metrics.

## License

This project is licensed under the MIT License.