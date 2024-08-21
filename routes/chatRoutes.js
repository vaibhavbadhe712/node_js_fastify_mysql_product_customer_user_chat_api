const chatController = require('../controller/chatcontroller');
const { verifyJwtOrPublicRoute } = require('../server'); // Correctly import the function

async function routes(fastify, options) {
    fastify.post('/send-message', { preHandler: verifyJwtOrPublicRoute },  chatController.sendMessage);
    fastify.get('/get-messages/:userId1-:userId2', { preHandler: verifyJwtOrPublicRoute },  chatController.getMessages);
}

module.exports = routes;
