const dotev = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
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

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URL, mongoDbOptions).then(() => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
