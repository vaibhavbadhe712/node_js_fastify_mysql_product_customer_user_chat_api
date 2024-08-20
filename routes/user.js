const authController = require('../controller/user');

async function routes(fastify, options) {
    fastify.post('/signup', authController.signup);
    fastify.post('/login', authController.login);
    fastify.get('/users', authController.getAllUsers); // Add this line

}

module.exports = routes;
