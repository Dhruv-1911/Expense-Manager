/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const AccountController = require("../api/controllers/AccountController");
const TransactionController = require("../api/controllers/TransactionController");
const auth = require("../api/policies/auth");



module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'auth',

  UserController:{
    'sign_up':true,
    'login':true,
  },

  AccountController:{
    'get_Account':true,
  },

  TransactionController:{
    'get_Transcation':true
  }

};
