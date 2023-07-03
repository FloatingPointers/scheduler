import jwt from 'jsonwebtoken';
import passport from 'passport';
import { validationResult } from 'express-validator';

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
userController.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({}, (err, result) => {
      res.status(200).json({ data: result });
    });
  }
);

export default userController;