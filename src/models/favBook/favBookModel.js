const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db/connect");

const favBooks = db.define(
  "favBooks",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
    },
    repassword: {
      type: DataTypes.STRING,
    },
    user_id: {
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
    tableName: "favorite_book",
  }
);

module.exports = favBooks;