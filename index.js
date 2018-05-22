const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const keys = require("./src/config/keys");
const routes = require("./src/routes/index");
const app = express();

mongoose.connect(keys.MONGO_URI, {
  user: keys.MONGO_USER,
  pass: keys.MONGO_PASS
});

const env = process.env.NODE_ENV;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



routes(app);

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

module.exports = app;