const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username is already taken"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email is already exist"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImg: {
    type: String,
    default:
      "https://ik.imagekit.io/xscpkjvr9/cohort-2-insta-clone-posts/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
