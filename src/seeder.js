require("dotenv").config();
const { faker } = require("@faker-js/faker");
const colors = require("colors");
const fs = require("fs");
const bycrypt = require("bcryptjs");

const connectDB = require("./config/connectDb");
const User = require("./models/user.model");
const Doctor = require("./models/doctor.model");

connectDB();

const generateRandomNumber = (min = 0, max = 100) => {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
};

const generateFakeUser = () => {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password() + "1";
  const age = generateRandomNumber(20, 60);
  const gender = faker.name.gender(true).toUpperCase();

  return {
    name,
    email,
    password,
    age,
    gender,
  };
};

const generateFakeDoctor = () => {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const password = faker.internet.password() + "1";
  const age = generateRandomNumber(20, 60);
  const gender = faker.name.gender(true).toUpperCase();
  const doctor_id = faker.random.alphaNumeric(6);
  const photo = faker.image.avatar();
  const specialities = faker.random.arrayElements(
    [
      "General Physician",
      "Gynaecologist",
      "Orthopedic",
      "Dermatologist",
      "Ent Surgeon",
      "Sexologist",
      "Ophthalmologist",
      "Pediatrician",
      "Urologist",
      "Dentist",
      "Physiotherapist",
      "Psychiatrist",
    ],
    1
  );

  const fees = generateRandomNumber(200, 800);
  const experience = generateRandomNumber(1, 20);
  const languages = faker.random.arrayElements(["Hindi", "Urdu", "Bengali", "English"], 1);
  const is_opt_for_listing = faker.datatype.boolean();
  const qualifications = faker.random.arrayElements(["MBBS", "BDS", "BAMS", "BUMS", "BHMS", "BYNS", "B.V.Sc & AH"], 4);

  return {
    name,
    email,
    password,
    age,
    gender,
    doctor_id,
    photo,
    specialities,
    fees,
    experience,
    languages,
    is_opt_for_listing,
    qualifications,
  };
};

const generateFakeData = async (count = { doctor: 5, user: 5 }) => {
  const doctors = [];
  const users = [];

  try {
    await User.deleteMany();
    await Doctor.deleteMany();

    for (let i = 1; i <= count.doctor; i++) doctors.push(generateFakeDoctor());

    for (let i = 1; i <= count.user; i++) users.push(generateFakeUser());

    const json = JSON.stringify({ users, doctors });

    fs.writeFile("dummyData.json", json, "utf8", (err) => {
      if (err) throw new Error(err);
    });

    for (let i = 0; i < count.doctor; i++) {
      const hashedPassword = await bycrypt.hash(doctors[i].password, 8);
      doctors[i].password = hashedPassword;
    }

    for (let i = 0; i < count.user; i++) {
      const hashedPassword = await bycrypt.hash(users[i].password, 8);
      users[i].password = hashedPassword;
    }

    await User.insertMany(users);
    await Doctor.insertMany(doctors);

    console.log(colors.green.inverse("Data generated!"));

    process.exit();
  } catch (error) {
    console.log(colors.red.inverse(error));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Doctor.deleteMany();

    console.log(colors.red.inverse("Data Destroyed!"));

    process.exit();
  } catch (error) {
    console.log(colors.red.inverse(error));
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else generateFakeData();
