const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const doctorService = require("./../services/doctor.service");

const getDoctors = catchAsync(async (req, res) => {
  const doctors = await doctorService.getAllDoctors();
  res.send(doctors);
});

const getSpecialist = catchAsync(async (req, res) => {
  const specialist = req.params.specialist;
  const doctors = await doctorService.getDoctorsBySpecialist(specialist);
  res.send(doctors);
});

module.exports = {
  getDoctors,
  getSpecialist,
};
