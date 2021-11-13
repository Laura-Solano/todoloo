const { DataTypes } = require("sequelize");
const db = require("../db");

const Reply = db.define("reply", {
    reply: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },

});

module.exports = Reply;