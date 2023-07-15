const store = require("../models/store");
let Store = require("../models/store");
const asyncHandler = require("express-async-handler");

exports.updateSettings = asyncHandler(async (req, res, next) => {

  let store = await Store.findById(req.user.id);

  store.settings = req.body.settings;

  await store.save();

  return res.status(200).json({ success: true });

}
);

exports.getSettings = asyncHandler(async (req, res, next) => {

  return res.status(200).json(await Store.findById(req.user.id).select('settings'));

}
);

//returns invite code 
exports.getInviteCode = asyncHandler(async (req, res, next) => {
  
  return res.status(200).json(await Store.findById(req.user.accountRef).select('inviteCode'));
}
);

exports.getNewInviteCode = asyncHandler(async (req, res, next) => {
  let store = await Store.findById(req.user.accountRef);
  let inviteCode;
  let isTaken = true;
  do {
    inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    isTaken = await Store.exists({ inviteCode }); //if broken use findone inviteCode:inviteCode
  } while (isTaken);
  console.log(inviteCode);
  store.inviteCode = inviteCode;
  await store.save();

  return res.status(200).json({ inviteCode : inviteCode });

})
