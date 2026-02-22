const followModel = require("../models/follow.model");

//send the request to follower
async function sendFollowRequestController(req, res) {
  const { follower, followee } = req.body;

  //prevent self following
  if (follower == followee)
    return res.status(400).json({
      message: "You are not allowed to self following",
    });

  const existing = await followModel.findOne({
    follower,
    followee,
  });

  if (existing) {
    return res.status(200).json({
      message: "Request already exist",
      status: existing.status,
    });
  }

  //send the request
  const request = await followModel.create({
    follower,
    followee,
    status: "pending",
  });

  res.status(201).json({
    message: "Request sent successfully",
    request,
  });
}

//Accept the follow request
async function acceptFollowRequestController(req, res) {
  const { follower, followee, status } = req.body;

  const request = await followModel.findOneAndUpdate(
    {
      follower,
      followee,
      status: "pending",
    },
    {
      status: "accepted",
    },
    { new: true },
  );

  if (!request) {
    return res.status(404).json({
      message: "follow request not found",
    });
  }

  res.status(200).json({
    message: "follow request accepted",
  });
}

//reqject the follow request
async function rejectFollowRequestController(req, res) {
  const { follower, followee, status } = req.body;

  const request = await followModel.findOneAndUpdate(
    {
      follower,
      followee,
      status: "pending",
    },
    { status: "rejected" },
    { new: true },
  );

  if (!request) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  res.status(201).json({
    message: "Follow request rejected",
  });
}

module.exports = {
  sendFollowRequestController,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
