const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database configuration

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

    tableName: 'customer',
    timestamps: true, // Enable timestamps for createdAt and updatedAt
    createdAt: 'created_at', // Custom field name for createdAt
    updatedAt: 'updated_at', // Custom field name for updatedAt
});
sequelize.sync();
module.exports = Customer;

