/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },

  'get /user/list': 'UserController.list_user',
  'post /user/sign_up': 'UserController.sign_up',
  'post /user/login': 'UserController.login',
  'patch /user/update/:userId': 'UserController.update',
  'get /user/logout/:userId': 'UserController.log_out',


  'get /account/list': 'AccountController.get_Account',
  'get /account/:accountId': 'AccountController.get_single_Account',
  'post /account/creat_A': 'AccountController.create_Account',
  'post /user/user_add': 'AccountController.user_Add',
  'patch /account/update/:accountId': 'AccountController.update_Account',
  'delete /account/delete/:accountId': 'AccountController.delete_Account',


  'get /transcation/list': 'TransactionController.get_Transcation',
  'post /transcation/add_T': 'TransactionController.create_Transcation',
  'patch /transcation/update/:transactionId': 'TransactionController.update_Transcation',
  'delete /transcation/delete/:transactionId': 'TransactionController.delete_Transcation',





  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
