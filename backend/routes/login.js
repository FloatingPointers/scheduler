var express = require('express');
const router = express.Router();

const passport = require('passport');
const {applyUserStrategy, applyLoginStrategy} = require('../store/passport');
applyUserStrategy(passport);
applyLoginStrategy(passport);

const userController = require('../controller/userController');




/*
POST - login as either an employee or store account
Request Body: {
  type - "STORE" or "EMPLOYEE" user type 
  email
  username
  password
  
  Store { - included only if login is of type "STORE"
    StoreId
    password
  }
  Employee { - included only if login is of type "EMPLOYEE"
    storeId
    username
    password
  }
}
Response Body: {
  token
  user  - corresponding user object w/o hashedPassword
}
*/
router.post('/login', passport.authenticate('local', { session: false }), userController.login);



/*
POST - Sign up either a store or employee account
Request Body: {

  --- REQUIRED fields
  type - "STORE" or "EMPLOYEE" account type
  password - Password to create the account with

  --- Account requires EITHER of these two fields, but does not require both ---
  username - Unique username for the store or employee account
  email - Unique email for the store or employee account

  --- OPTIONAL fields
   --- Store Account
   storeName - A non-unique display name for this store

   --- Employee Account
   firstName - A non-unique first name for this employee
   lastName - A non-unique last name for this employee

}
*/
router.post("/sign-up", userController.signup);

/*
GET - Get type of user account
Request Body: {

  --- REQUIRED fields
  only attached jwt token to auth header

}
*/
router.post("/get-type", passport.authenticate('jwt', { session: false }), userController.getType);



module.exports = router;