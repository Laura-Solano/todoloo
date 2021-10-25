const { DataTypes } = require("sequelize");
const db = require("../db");

const Reviews = db.define("reviews", {
  locationName: {
      type: DataTypes.STRING,
        allowNull: false,
      },
  review: {
        type: DataTypes.STRING(1500),
        allowNull: false,
      },
  isFree: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  numStall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  isHelpful: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  stallType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl:{
    type: DataTypes.STRING,
    allowNull: true
  }
  
});
module.exports = Reviews;
