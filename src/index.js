const dotev = require("dotenv");
const colors = require("colors");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

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

//morgan request logger
if (app.get("env") !== "production") app.use(morgan("dev"));

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URL, mongoDbOptions).then(() => {
  console.log(colors.cyan("Connected to MongoDB"));

  app.listen(PORT, () => {
    console.log(colors.magenta(`Server running on port ${PORT}`));
  });
});

module.exports = app;
