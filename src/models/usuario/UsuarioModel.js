const { DataTypes } = require('sequelize');
const db = require("../../db/connect")

const Usuario = db.define(
    'usuario', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        senha: {
            type: DataTypes.STRING
        },
    },
    {
        tableName: 'usuario',
    }
);

module.exports = Usuario;