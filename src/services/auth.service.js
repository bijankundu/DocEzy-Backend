const userService = require("./../services/user.service");
const doctorService = require("./../services/doctor.service");
const ApiError = require("./../utils/ApiError");
const httpStatus = require("http-status");

const loginUserWithEmailAndPassword = async (email, password, userType) => {
  let user = null;

  if (userType === "doctor") user = await doctorService.getDoctorByEmail(email);
  else user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  user["password"] = null;

  return user;
};

module.exports = { loginUserWithEmailAndPassword };
