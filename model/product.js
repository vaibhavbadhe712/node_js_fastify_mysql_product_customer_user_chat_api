const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database configuration

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'products', // Table name in the database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
sequelize.sync();

module.exports = Product;
