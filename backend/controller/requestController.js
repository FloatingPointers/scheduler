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
  const archived = req.params.isArchived === "true";
  let currentDay = new Date();
  currentDay.setHours(0, 0, 0);
  let query = null;
  if (req.params.isArchived === "true") {
    query = { end: { $lt: currentDay } };
  } else {
    query = { end: { $gte: currentDay } };
  }
  const requests = await Request.find({
    "senderTag.id": req.user._id,
    ...query,
  })
    .skip(10 * req.params.page)
    .limit(10)
    .sort({ start: -1 });

  return res.status(200).json(requests);
});

exports.numPages = asyncHandler(async (req, res, next) => {
  const archived = req.params.isArchived === "true";
  let pages = await Request.countDocuments({
    type: req.params.type,
    archived,
  });

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

exports.getStoreRequests = asyncHandler(async (req, res, next) => {
  const pending = req.params.pending === "true";
  const storeId = req.user.accountRef;

  const query = {
    storeId: storeId,
    status: pending ? "PENDING" : { $ne: "PENDING" },
  };

  const requests = await Request.find(query)
    .sort({ start: 1 })
    .skip(10 * req.params.page)
    .limit(10);

  return res.status(200).json(requests);
});

exports.updateRequest = asyncHandler(async (req, res, next) => {
  const status = req.body.status;
  const storeId = req.user.accountRef;

  const request = await Request.findById(req.params.requestId);
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }

  if (request.storeId.toString() !== storeId.toString()) {
    return res.status(400).json({ error: "Request not for this store" });
  }

  if (request.status !== "PENDING") {
    return res
      .status(400)
      .json({ error: "Request has already been processed" });
  }

  request.status = status;
  await request.save();

  return res.status(200).json(request);
});
