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
  
    return res.status(200).json( await Store.findById(req.user.id).select('settings'));
  
  }
);
