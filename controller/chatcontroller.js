const { Op } = require('sequelize');
const Message = require('../model/chatmedel');

const sendMessage = async (req, reply) => {
    try {
        const { sender_id, receiver_id, text } = req.body;

        // Create a unique conversation ID based on the sender and receiver
        const conversation_id = [sender_id, receiver_id].sort().join('-');

        const message = await Message.create({
            conversation_id,
            sender_id,
            receiver_id,
            text,
        });

        reply.send({ message });
    } catch (err) {
        console.error(err);
        reply.status(500).send({ error: 'Failed to send message' });
    }
};

const getMessages = async (req, reply) => {
    try {
        const { userId1, userId2 } = req.params;

        // Fetch messages between userId1 and userId2 in both directions
        const conversation_id = [userId1, userId2].sort().join('-');

        const messages = await Message.findAll({
            where: {
                conversation_id
            },
            order: [['createdAt', 'ASC']]  // Order by message creation time
        });

        reply.send(messages);
    } catch (err) {
        console.error(err);
        reply.status(500).send({ error: 'Failed to fetch messages' });
    }
};

module.exports = {
    sendMessage,
    getMessages,
};
