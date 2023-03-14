/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    T_date: {
      // type: 'datetime',
      // defaultsTo: () => new Date()
      type: 'ref',
      columnType: 'Transcation_date',
      defaultsTo: Date.now()
    },
    T_amount: {
      type: 'String',
      required: true
    },
    T_type: {
      type: "String",
      required: true
    },
    Account: {
      model: "account"
    }
  },
};

