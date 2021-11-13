const { DataTypes } = require("sequelize");



const db = require("../db");
const Photo = db.define("photo", {
    photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
});

  module.exports = Photo;