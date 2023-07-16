const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./src/config/passport");
require("dotenv").config();
const connectDB = require("./db");
connectDB(process.env.DATABASE_URL);
const router = require("./src/routes/auth");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use("/api", router);

const jwt = require("jsonwebtoken");
//const config = require("./src/config/keys");

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express and React js" });
});
//zoom

const payload = {
  iss: process.env.jwt_secret,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, process.env.jwt_secret);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
