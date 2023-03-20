/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Name: {
      type: "String",
      required: true
    },

    Email: {
      type: "String",
      required: true,
      unique: true,
      isEmail: true
    },

    Password: {
      type: 'string',
      unique: true,
      custom: function (value) {
        return _.isString(value) && value.length >= 8;
      }
    },

    //here we use many to many associations
    Accounts: {
      collection: "account",
      via: "Users"
    },


  }
};

