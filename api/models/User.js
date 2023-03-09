/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  // id:{
  //   type:"String",
  // },
  name: {
    type: "String",
    required: true
  },
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    unique: true,
    custom: function (value) {
      return _.isString(value) && value.length >= 8;
    }
  },
  // accounts:{
  //   collection:'account',
  //   via:'User'
  // }
}
};

