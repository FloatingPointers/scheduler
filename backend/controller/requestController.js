let Request = require("../models/request");
const asyncHandler = require("express-async-handler");

exports.createReq = asyncHandler(async (req, res, next) => {
  let request = new Request({
    ...req.body,
    senderTag: {
      name: req.user.name,
      id: req.user._id,
    },
  });
  await request.save();
  return res.status(200).json(request);
});

exports.getPage = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({ "senderTag.id": req.user._id })
    .skip(10 * req.params.page)
    .limit(10)
    .sort({ start: -1 });

  return res.status(200).json(requests);
});

exports.numPages = asyncHandler(async (req, res, next) => {
  let pages = await Request.countDocuments({ type: req.params.type });

  return res.status(200).json({
    pages: Math.ceil(pages / 10),
  });
});

exports.deleteReq = asyncHandler(async (req, res, next) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(404).json({ error: "Request to delete is not found" });
  }

  return res.status(200).json({
    success: true,
  });
});
