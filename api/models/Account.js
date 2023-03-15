

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
        //here single user has multiple account-- one to many Associations
        // User: {
        //     model: 'user',
        // },
        //here we use Associations one to many one account has multiple transaction
        transactions: {
            collection: "transaction",
            via: "Account"
        },

        Users: {
            collection: "user",
            via: "Accounts"
        }
    }
};