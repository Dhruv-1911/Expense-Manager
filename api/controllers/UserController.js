/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const cookieparser = require("cookie-parser")
const nodemailer = require('nodemailer');
// const constant = require("../../config/constant")


module.exports = {

  //list of all login user
  list_user: async (req, res) => {
    try {
      let id = req.params.userId;
      let users = await User.find({_id:id})
        .populate("Accounts")//here we populate account model
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

      let { Name, Email, Password } = req.body
      let hash = await bcrypt.hash(Password, sails.config.constant.SALT)
      console.log(hash);
      let user = await User.create(
        {
          Name: Name,
          Email: Email,
          Password: hash
        }
      ).fetch()
      // successful signup,create a user’s default account
      await Account.create({
        // A_name: "Default Account",
        // A_type: "saving",
        User: user.id
      })

      // Send a Welcome Email to new user
      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kakadiyadhruv868@gmail.com',
          pass: sails.config.constant.PASS
        }
      });

      let mailDetails = {
        from: 'kakadiyadhruv868@gmail.com',
        to: Email,
        subject: 'Expense Manager',
        html: `hi ,${Name} <br> welcome to the Expense Manager App and your password is ${Password} `
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log('Error Occurs');
          console.log(err)
        } else {
          console.log('Email sent successfully');
        }
      });

      res.send({
        message: "user Register",
        // token: token

      })
    } catch (error) {
      res.status(500).send({
        message: error
      })
      // console.log(error);
    }
  },

  //user login
  login: async (req, res) => {
    try {
      //get email,password from user
      let { Email, Password } = req.body
      //find email from database
      let user = await User.findOne({ Email: Email })
      if (user) {
        //password bcrypt compare 
        let match_p = await bcrypt.compare(Password, user.Password)
        //jwt token 
        let token = sails.config.constant.JWT.sign({ userId: user.id }, sails.config.constant.JWT_Secret, {
          expiresIn: "1d"
        })
        //here we send token with cookie
        res.cookie("token", token, {
          httpOnly: true
        })

        if (match_p && (user.Email === Email)) {
          res.status(200).json({
            message: "user Login",
            token: token
          })
        }
        else {
          res.status(500).json({
            message: " Email && password not match"
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
      console.log(error);
    }
  },

  //user can update details
  update: async (req, res) => {
    try {
      let { Name, Email, Password } = req.body
      let id = req.params.userId
      console.log("paramsdmsd",id);
      //create hash password
      let user = await User.findOne({_id: id });
      console.log(user.id);
      if (user) {
        let hash = await bcrypt.hash(Password, sails.config.constant.SALT)
        await User.update({ _id: id }).set({
          Name: Name,
          Email: Email,
          Password: hash
        });
        res.send({
          message: "user updated"
        })
      }
      else {
        res.status(404).send({
          message: "User not Found"
        })
      }
    }
    catch (error) {
      res.status(404).json({
        error: error
      })
      // console.log(error);
    }
  },

  // here user log_out 
  log_out: async (req, res) => {
    try {
      //here we clear user cookie
      res.clearCookie("token");
      res.send({
        message: "user logout "
      })
    }
    catch (error) {
      res.status(404).json({
        message: "user not found"
      })
    }
  }
};

