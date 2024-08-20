const chatController = require('../controller/chatcontroller');

async function routes(fastify, options) {
    fastify.post('/send-message', chatController.sendMessage);
    fastify.get('/get-messages/:userId1-:userId2', chatController.getMessages);
}

module.exports = routes;
