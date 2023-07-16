const express = require('express');
const router = express.Router();

const passport = require('passport');
const { applyUserStrategy, storeAuth } = require('../store/passport.js');

applyUserStrategy(passport);

const storeController = require('../controller/storeController');

router.get('/store/invite-code', passport.authenticate('jwt', {session: false}), storeAuth , storeController.getInviteCode);

router.get('/store/new-invite-code', passport.authenticate('jwt', {session: false}), storeAuth , storeController.getNewInviteCode);







module.exports = router;
