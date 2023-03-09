/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const Account = require('../models/Account');
// const User = require('../models/User');
// const  uuid = require('uuid');


module.exports = {

  //list of all login user
  list_user: async (req, res) => {
    try {
      const users = await User.find()
      res.send({
        count: users.length,
        users: users
      })
    } catch (error) {
      res.status(404).json({
        message: "user not found"
      })
    }
  },

  //use sign_up
  sign_up: async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create(
      { // _id:uuid.v4(),
        name: name,
        email: email,
        password: hash
      }
    ).fetch()
    // .populate("accounts")
        // const user_f = await User.findOne({ id: user.id })
        // console.log(user_f);
        console.log( "user",user.id)
    // //    jwt token
        // const token = jwt.sign({ userId: user_f.id }, "ABC!@#$", {
        //     expiresIn: "1d"
        //   })

       const account = await Account.create({
        A_name:"Account",
        A_type:"saving",
        user:user.id
      })
      
    res.send({
      message: "user Register",
      account : account
      // token: token
    })
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
        const token = jwt.sign({ userId: user.id },sails.config.custom.JWT_Secret, {
          expiresIn: "1d"
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
      
      await User.update({ id: id }).set({
        name: name,
        email: email,
        password:password
      });
      res.send({
        message: "user updated"
      })
    }
    catch (error) {
      res.status(404).json({
        message: "user not found"
      })
    }
  },

  //user log_out 
  log_out: async (req, res) => {
    try {
      const id = req.params.userId
      await User.destroy({ id: id })
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

