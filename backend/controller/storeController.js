const store = require("../models/store");
let Store = require("../models/store");
let User = require("../models/user");
const asyncHandler = require("express-async-handler");

function padTimeUnit(unit) {
  return unit.toString().padStart(2, "0");
}

exports.updateSettings = asyncHandler(async (req, res, next) => {
  const { name, settings } = req.body;
  const { startDay, endDay, openTime, closeTime, roles } = settings;

  // Get current Store model from the database.

  // Create date objects for openTime and closeTime
  const openTimeParts = openTime.split(":").map(Number);
  const closeTimeParts = closeTime.split(":").map(Number);

  // Create a base date object from epoch time
  const baseDate = new Date(0);

  const openTimeDate = new Date(baseDate);
  openTimeDate.setUTCHours(openTimeParts[0], openTimeParts[1]);

  const closeTimeDate = new Date(baseDate);
  closeTimeDate.setUTCHours(closeTimeParts[0], closeTimeParts[1]);

  // Update settings

  await Store.findByIdAndUpdate(req.user.accountRef, {
    settings: {
      startDay: startDay,
      endDay: endDay,
      openTime: openTimeDate,
      closeTime: closeTimeDate,
      roles,
    },
  });

  await User.findByIdAndUpdate(req.user._id, { name });

  return res.status(200).json({ success: true });
});

exports.getSettings = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.user.accountRef);
  const { settings } = store;
  const { name } = req.user;

  const { startDay, endDay } = settings; //end day is a string for some reason

  // Extract hours and minutes from Date object and pad with 0 if necessary
  const openTime = `${padTimeUnit(
    settings.openTime.getUTCHours()
  )}:${padTimeUnit(settings.openTime.getUTCMinutes())}`;
  const closeTime = `${padTimeUnit(
    settings.closeTime.getUTCHours()
  )}:${padTimeUnit(settings.closeTime.getUTCMinutes())}`;

  return res.status(200).json({
    name,
    settings: {
      ...settings,
      startDay,
      endDay,
      openTime,
      closeTime,
    },
  });
});

//returns invite code
exports.getInviteCode = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .json(await Store.findById(req.user.accountRef).select("inviteCode"));
});

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

  return res.status(200).json({ inviteCode: inviteCode });
});

//Gets settings for default schedule
exports.getScheduleSettings = asyncHandler(async (req, res, next) => {
  let settings = await Store.findById(req.user.accountRef).select({
    settings: {
      openTime: 1,
      closeTime: 1,
      startDay: 1,
    },
  });

  return res.status(200).json(settings);
});
