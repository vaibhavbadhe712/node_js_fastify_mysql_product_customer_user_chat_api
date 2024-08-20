const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING,
        defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 12), // Generate a 12-character hex ID
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});


// Sync the model with the database
sequelize.sync();

module.exports = User;
