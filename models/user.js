const { DataTypes } = require("sequelize");
const db = require("../db");


const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
},
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
}
});
module.exports = User;
