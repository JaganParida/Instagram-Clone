const mongoose = require("mongoose");

async function conncetToDb() {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connceted to db");
  });
}

module.exports = conncetToDb;
