const dotev = require("dotenv");
const colors = require("colors");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/connectDb");

const routes = require("./routes");

//configuring environment variables
dotev.config();

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

//parse cookies from incomming requests
app.use(cookieParser());

//morgan request logger
if (app.get("env") !== "production") app.use(morgan("dev"));

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(colors.magenta(`Server running on port ${PORT}`));
  });
});

module.exports = app;
