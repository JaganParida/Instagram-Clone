require("dotenv").config();
const app = require("./src/app");
const conncetToDb = require("./src/config/database");

conncetToDb();

app.listen(3000, () => {
  console.log("srever is listening on port 3000");
});
