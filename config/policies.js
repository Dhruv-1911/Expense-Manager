/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const auth = require("../api/policies/auth");



module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': ['auth'],
  // 'UserController':{
  //   'sign_up':true,
  //   'login':true,
  // },
  'UserController':{
    'list_user':['auth'],
    'update':["auth"]
  }

};
