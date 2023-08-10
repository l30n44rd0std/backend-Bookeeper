const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db/connect");

const LivrosFavoritos = db.define(
  "LivrosFavoritos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem_capa: {
      type: DataTypes.STRING,
    },
    resenha: {
      type: DataTypes.STRING,
    },
    usuairo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    google_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Quero ler",
    },
  },
  {
    timestamps: true,
    tableName: "livro_favorito",
  }
);

module.exports = LivrosFavoritos;