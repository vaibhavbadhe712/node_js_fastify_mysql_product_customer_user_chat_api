const { Op } = require('sequelize');
const User = require('../model/user');
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcrypt');

const signup = async (req, reply) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if (existingUser) {
            return reply.status(400).send({ error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        reply.status(201).send({
            userId: newUser.userId,
            username: newUser.username,
            email: newUser.email
        });
    } catch (err) {
        console.error(err);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};


const login = async (req, reply) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });
        console.log('Username:', username);
        console.log('User found:', user);
        
        if (!user) {
            return reply.status(401).send({ error: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return reply.status(401).send({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = generateToken(user);

        reply.send({ token });
    } catch (err) {
        console.error(err);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};
const getAllUsers = async (req, reply) => {
    try {
        const users = await User.findAll({
            attributes: ['userId', 'username', 'email'] // Customize the attributes as needed
        });

        reply.send(users);
    } catch (err) {
        console.error(err);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};


module.exports = {
    signup,
    login,
    getAllUsers,
};
