var express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

/*  Request body 
      token
    Response data
      success - Bool
*/
router.post('verifyToken', userController.verifyToken);

/*  Request body 
      token
      password
    Response data
      success - Bool
*/
router.post('reset', userController.changePassword);

/*  Request body 
      email
    Response data
      success - Bool
       or
      error - invalid token
*/
router.post('request', userController.forgotPassword);


module.exports = router;


