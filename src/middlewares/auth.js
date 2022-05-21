const httpStatus = require("http-status");
const ApiError = require("./../utils/ApiError");
const tokenService = require("./../services/token.service");
const doctorService = require("./../services/doctor.service");
const userService = require("./../services/user.service");

const auth = async (req, res, next) => {
  try {
    const userType = req.query?.userType || "user";
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new Error(httpStatus.UNAUTHORIZED, "Token not found");

    const decodedToken = tokenService.verifyToken(token);
    let user = {};
    if (userType === "doctor") user = await doctorService.getDoctorById(decodedToken.userId);
    else user = await userService.getUserById(decodedToken.userId);

    user.password = null;
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Token");
  }
};

module.exports = auth;
