const User = require("./user");
const Reviews = require("./reviews");
const Photo = require("./photo");
const Reply = require("./reply");

User.hasMany(Reviews);
Reviews.belongsTo(User);
Reviews.hasMany(Photo);
Photo.belongsTo(Reviews);
Reviews.hasOne(Reply);
Reply.belongsTo(Reviews);


module.exports = {
User,
Reviews,
Photo,
Reply
  
};
