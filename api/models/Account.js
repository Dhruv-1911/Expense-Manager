


module.exports = {
    attributes: {
        AccountName: {
            type: "String",
            defaultsTo: "default"
        },
        AccountType: {
            type: "String",
            defaultsTo: "saving"
        },
    
        //here we use Associations one to many one account has multiple transaction
        transactions: {
            collection: "transaction",
            via: "Account"
        },

        //here use many to many for add new user in account 
        Users: {
            collection: "user",
            via: "Accounts"
        }
    }
};