/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {

    TransactionDate: {
      type: 'ref',
      columnType: 'Transcation_date',
      defaultsTo: Date.now()
    },

    TransactionAmount: {
      type: 'String',
      required: true
    },

    TranscationType: {
      type: "String",
      required: true
    },

    //here we use Associations one to many one account has multiple transaction
    Account: {
      model: "account"
    }
  },
};
