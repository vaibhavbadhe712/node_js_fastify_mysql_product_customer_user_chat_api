const { Sequelize } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('data', 'root', 'vaibhav@2004', {
    host: 'localhost',
    dialect: 'mysql',
    port:'3306' // Change this to your database dialect (e.g., 'postgres', 'sqlite')
});

module.exports = sequelize;
