const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const mongoDbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URL, mongoDbOptions);

    console.log(colors.cyan(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.red.underline.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

module.exports = connectDB;
