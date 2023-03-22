/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const cookieparser = require("cookie-parser");


const Constant = sails.config.constant

module.exports = {

  //list of all login user
  list_user: async (req, res) => {
    try {
      let id = req.params.userId;
      let users = await User.find({ _id: id })
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

      let hash = await Constant.bcrypt.hash(Password, Constant.SALT)

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
        User: user.id
      })

      //here we use helper for sending wel-come mail
      await sails.helpers.sendEmail.with({
        user: Constant.Email,
        pass: Constant.PASS,
        to: Email,
        Name: Name,
        Password: Password
      })

      res.send({
        message: "user Register",

      })
    } catch (error) {
      res.status(500).send({
        message: error
      })
      console.log(error);
    }
  },

  //user login
  login: async (req, res) => {
    try {
      //get email,password from user
      let { Email, Password } = req.body
      //find email from database
      let user = await User.findOne({ Email: Email })
      console.log(user);
      if (user) {
        //password bcrypt compare 
        let match_p = await Constant.bcrypt.compare( Password, user.Password)
        // console.log("1",Password);
        // console.log("2",user.Password);
        // console.log(match_p);
        //jwt token 

        let token = Constant.JWT.sign({ userId: user.id }, Constant.JWT_Secret, {
          expiresIn: "1d"
        })

        if (match_p && (user.Email === Email)) {

          //here we send token with cookie
          res.cookie("token", token, {
            httpOnly: true
          })
          
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
      // console.log("params", id);
      
      //create hash password
      let user = await User.findOne({ _id: id });
      console.log(user.id);
      if (user) {
        let hash = await Constant.bcrypt.hash(Password, Constant.SALT)
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

