// const Account = require("../models/Account")
// const User = require("../models/User")




module.exports = {

    get_Account: async (req, res) => {
        try {
            const account = await Account.find()
            .populate("transactions")
            res.status(200).send({
                message: " Here All Accouns",
                count:account.length,
                accounts: account
            })
        } catch (error) {
            res.status(500).send({
                message: "account not found"
            })
        }
    },

    create_Account: async (req, res) => {
        try {
            const { A_name, A_type, User } = req.body
            const account = await Account.create({
                A_name: A_name,
                A_type: A_type,
                User:User
            })
            res.status(201).send({
                message: "Account created",
                account: account
            })

        } catch (error) {
            res.status(500).json(
                {
                    message: "not created"
                }
            )
        }
    },
    user_add: async (req,res)=> {
        try {
            const{ user_e , id }= req.body
         await Account.addToCollection(id,"user_e")
            .memebers([id])
        //  user_e.push(user_e)

        }  catch (error) {
            res.status(500).json(
                {
                    message: "not add"
                }
            )
        }
    },

    update_Account: async (req, res) => {
        try {
            const{A_name,A_type} = req.body
            const id =req.params.accountId
            await Account.update({ id: id }).set({
                A_name: A_name,
                A_type: A_type,
              });
              res.status(200).send({
                message:"Account update"
              })
        } catch (error) {
            res.status(500).json(
                {
                    message: "not updated"
                }
            )
        }
    },

    delete_Account: async (req, res) => {
        try {
            id = req.params.accountId
            await Account.destroy({ id: id })
            res.status(200).send({
                message:"Account Delete "
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: "not deleted"
                }
            )
        }
    }
}