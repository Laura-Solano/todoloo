const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const { Op } = require("sequelize");

const validateSession = require("../middleware/validate-session");

const router = Router();


router.post('/register', async (req, res) => {
  const { email, username, password } = req.body.user;
  try {
      const existingUsers = await User.findAll({
          where: {
              [Op.or]: [{ email: email }, { username: username }],
          },
      });
      // if the username or email is already registered construct a message to send back in the response
      if (existingUsers.length > 0) {
          let emailMessage, usernameMessage;
          for(existingUser of existingUsers) {
              if(existingUser.email === email) {
                  emailMessage = `${email} is already registered with TodoLoo.`
              }
              if(existingUser.username === username) {
                  usernameMessage = `${username} is already registered with TodoLoo.`
              }
          }
          res.status(409).json({
              emailMessage: emailMessage,
              usernameMessage: usernameMessage,
          });
          return;
      }
  } catch (error) {
      // catch error with findAll method and send it in the response
      res.status(500).json({
          message: 'Problem creating new user',
          error: error,
      });
      return;
  }
  try {
      // create the new user in the table
      const newUser = await User.create({
          email: email,
          username: username,
          passwordhash: bcrypt.hashSync(password, 13),
      });
      // create a token with the newUser id
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
      });
      // send a success message and token with the repsonse
      res.status(200).json({
          message: `Welcome ${username} to TodoLoo`,
          sessionToken: token,
      });
  } catch (error) {
      // catch error with create method and send it in the response
      res.status(500).json({
          message: 'Something went wrong, please try again.',
          error: error,
      });
  }
});



/*
    User Login
*/
router.post('/login', async (req, res) => {
  const {
      email,
      password
  } = req.body.user;
  try {
      const user = await User.findOne({
          where: {
              email: email
          }
      })
      if(user !== null) {
          bcrypt.compare(password, user.passwordhash, (err, matches) => {
              if(!err && matches) {
                  let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                  res.status(200).json({
                      message: `Welcome Back ${username}!`,
                      sessionToken: token
                  })
              }
              else {
                  res.status(409).json({
                      passwordMessage: 'Sorry, your password was incorrect. Please double-check your password'
                  })
              }
          })
      }
      else {
          res.status(409).json({
              emailMessage: 'Email not found. Please register as a new user.'
          })
      }
  }
  catch(error) {
      res.status(500).json({
          mesage: 'Something went wrong please try again.',
          error: error
      })
  }
})

module.exports = router;
