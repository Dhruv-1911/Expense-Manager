// const Account = require("../models/Account")
// const User = require("../models/User")




module.exports = {

    //get all account
    get_Account: async (req, res) => {
        try {
            const account = await Account.find()
                .populate("transactions")
            res.status(200).send({
                message: " Here All Accouns",
                count: account.length,
                accounts: account
            })
        } catch (error) {
            res.status(500).send({
                message: "account not found"
            })
        }
    },

    //get single account
    get_single_Account: async (req, res) => {
        try {
            id = req.params.accountId
            const account = await Account.find({id: id})
                .populate("transactions",{sort : "T_date DESC"})
                
            res.status(200).send({
                account: account
            })
        } 
        catch (error) {
            res.status(500).send({
                error: error
            })
        }
    },

    create_Account: async (req, res) => {
        try {
            const { A_name, A_type, User } = req.body
            const account = await Account.create({
                A_name: A_name,
                A_type: A_type,
                User: User
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

//add new user to account
    user_add:async(req,res)=>{
        try {
            const{email , id } = req.body
            const users = await User.find({email})
            .populate("Accounts")

            // console.log(users);
          const account =   await Account.addToCollection(id,"Users",users.id)
         console.log(account);
            const user = await Account.find({id :id})
            .populate("Users")
            res.send({
                message:"user add",
                user
            })
            
        } catch (error) {
            res.status(500).send({
                error:error
            })
        }

    },


    //update account
    update_Account: async (req, res) => {
        try {
            const { A_name, A_type } = req.body
            const id = req.params.accountId
            await Account.update({ id: id }).set({
                A_name: A_name,
                A_type: A_type,
            });
            res.status(200).send({
                message: "Account update"
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: "not updated"
                }
            )
        }
    },


    //delete account
    delete_Account: async (req, res) => {
        try {
            id = req.params.accountId
            await Account.destroy({ _id: id })
            res.status(200).send({
                message: "Account Delete "
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