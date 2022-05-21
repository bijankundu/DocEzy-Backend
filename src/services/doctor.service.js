const Doctor = require("./../models/doctor.model");
const ApiError = require("./../utils/ApiError");
const httpStatus = require("http-status");

const createDoctor = async (userBody) => {
  if (await Doctor.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return Doctor.create(userBody);
};

const getDoctorById = async (id) => {
  return Doctor.findOne({ _id: id });
};

const getDoctorByEmail = async (email) => {
  return Doctor.findOne({ email });
};

const getAllDoctors = async () => {
  return Doctor.find({});
};

const getDoctorsBySpecialist = async (specialist) => {
  return Doctor.find({ specialities: specialist });
};

module.exports = { createDoctor, getDoctorById, getDoctorByEmail, getAllDoctors, getDoctorsBySpecialist };
