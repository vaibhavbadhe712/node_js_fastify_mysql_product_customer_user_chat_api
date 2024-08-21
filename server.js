const fastify = require('fastify')();
const customerRoutes = require('./routes/customerRoutes');
const sequelize = require('./config/db');
const productRoutes = require('./routes/product');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/user');
require('dotenv').config();

// Register JWT plugin 
fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET_KEY // Ensure you have this in your .env file
});

// Register the authenticate decorator
fastify.decorate("authenticate", async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.status(401).send({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
});     

// JWT Token Verification Hook
const verifyJwtOrPublicRoute = async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.status(401).send({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
};

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error: ' + err));

// Register routes
fastify.register(customerRoutes);
fastify.register(productRoutes); // Register product routes
fastify.register(chatRoutes);  // Register chat routes
fastify.register(authRoutes); // Register authentication routes

// Start server
fastify.listen({ port: 3000 }, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Server running on port 3000');
});

// Export the verification function
module.exports = { fastify, verifyJwtOrPublicRoute };
