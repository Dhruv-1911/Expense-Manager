

module.exports = {

    //here show  all account
    get_Account: async (req, res) => {
        try {
            let account = await Account.find()
                .populate("transactions"); //here we populate transactions table
            res.status(200).send({
                message: " Here All Accouns",
                count: account.length,
                account
            });
        } catch (error) {
            res.status(500).send({
                message: "account not found"
            });
        }
    },

    //get single account
    get_single_Account: async (req, res) => {
        try {
            id = req.params.accountId
            let account = await Account.findOne({ _id: id })
                //For the selected account, get the list of transactions ordered by the transaction date descending
                .populate("transactions", { sort: "T_date DESC" });

            res.status(200).send({
                account: account
            });
        }
        catch (error) {
            res.status(500).send({
                message:"Account not Found"
            });
        }
    },

    //create a user Account
    create_Account: async (req, res) => {
        try {
            let { AccountName, AccountType, User } = req.body
            let account = await Account.create({
                AccountName: AccountName,
                AccountType: AccountType,
                User: User
            });
            res.status(201).send({
                message: "Account created",
                account: account
            });

        } catch (error) {
            res.status(500).json(
                {
                    message: "not created"
                }
            );
        }
    },

    //add new user to account
    user_Add: async (req, res) => {
        try {
            let { Email, id } = req.body
            //here we get user id
            let users = await User.find({ Email });
            // console.log("user id",users[0].id);
            //here we use manay to many Associations
            let account = await Account.addToCollection(id, "Users", users[0].id)
            // console.log("account", account);

            let user = await Account.find({ _id: id })
                // .lean()
                .populate("Users");

            // console.log(user[0].Users)
            res.send({
                message: "user add",
                New_User_add: user[0].Users.length,
                users: user
            });

        } catch (error) {
            res.status(500).send({
                message:"User not add"
            });
        }

    },


    // Edit account
    update_Account: async (req, res) => {
        try {
            let { AccountType, AccountName } = req.body
            let id = req.params.accountId
            await Account.update({ _id: id }).set({
                AccountName: AccountName,
                AccountType: AccountType,
            });
            res.status(200).send({
                message: "Account update"
            });
        } catch (error) {
            res.status(500).json
                ({
                    message: "not updated"
                });
        }
    },


    //Delete account
    delete_Account: async (req, res) => {
        try {
            let id = req.params.accountId
            await Account.destroy({ _id: id });

            res.status(200).send({
                message: "Account Delete "
            });
        }
        catch (error) {
            res.status(500).json
                ({
                    message: "not deleted"
                });
        }
    }
}
