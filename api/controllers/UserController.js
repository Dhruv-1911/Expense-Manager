/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const nodemailer = require('nodemailer');

// const  uuid = require('uuid');

module.exports = {

  //list of all login user
  list_user: async (req, res) => {
    try {
      const users = await User.find()
        .populate("accounts")
      res.send({
        count: users.length,
        users: users
      })
    } catch (error) {
      res.status(404).json({
        message: error
      })
    }
  },

  //use sign_up
  sign_up: async (req, res) => {
    try {

      const { name, email, password } = req.body
      const hash = await bcrypt.hash(password, 10)
      const user = await User.create(
        { // _id:uuid.v4(),
          name: name,
          email: email,
          password: hash
        }
      ).fetch()
        // send a  wel-come mail
      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dhruvkakadiya1911@gmail.com',
          pass: sails.config.custom.PASS
        }
      });

      let mailDetails = {
        from: 'dhruvkakadiya1911@gmail.com',
        to: email,
        subject: 'Expense Manager',
        text: `hi ,${name} welcome to the Expense Manager App and your password is ${password} `
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log('Error Occurs');
          console.log(err)
        } else {
          console.log('Email sent successfully');
        }
      });

      await Account.create({
        // A_name: "Default Account",
        // A_type: "saving",
        User: user.id
      })
      res.send({
        message: "user Register",
        // token: token

      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }

  },


  //user login
  login: async (req, res) => {
    try {
      //get email,password from user
      const { email, password } = req.body
      //find email from database
      const user = await User.findOne({ email: email })
      if (user) {
        //password bcrypt compare 
        const match_p = await bcrypt.compare(password, user.password)
        //jwt token 
        const token = jwt.sign({ userId: user.id }, sails.config.custom.JWT_Secret, {
          expiresIn: "1d"
        })
        res.cookie("token", token, {
          httpOnly: true
        })
        if (match_p && (user.email === email)) {
          res.status(200).json({
            message: "user Login",
            token: token
          })
        }
        else {
          res.status(500).json({
            message: "password not match"
          })
        }
      } else {
        res.send({
          message: "email not found"
        })
      }
    } catch (error) {
      res.status(500).json({
        message: "All field required"
      })
    }
  },

  

  //user can update  details
  update: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const id = req.params.userId
      const hash = await bcrypt.hash(password, 10)
      await User.update({ id: id }).set({
        name: name,
        email: email,
        password: hash
      });
        res.send({
          message: "user updated"
        })
      
    }
    catch (error) {
      res.status(404).json({
       error:error
      })
      console.log(error);
    }
  },

  //user log_out 
  log_out: (req, res) => {
    try {
      res.clearCookie("token");
      res.send({
        message: "user logout "
      })
    } catch (error) {
      res.status(404).json({
        message: "user not found"
      })
    }
  }

};

