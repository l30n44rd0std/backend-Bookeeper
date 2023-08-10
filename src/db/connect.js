const { Sequelize} = require('sequelize');

const dbSequelize = new Sequelize('backend-bookeeper', 'root', 'mysql123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = dbSequelize