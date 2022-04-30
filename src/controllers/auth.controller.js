const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const userService = require("./../services/user.service");
const doctorService = require("./../services/doctor.service");
const tokenService = require("./../services/token.service");
const authService = require("./../services/auth.service");

const register = catchAsync(async (req, res) => {
  const userType = req.params.userType;
  let user = null;

  if (userType === "doctor") {
    user = await doctorService.createDoctor(req.body);
  } else {
    user = await userService.createUser(req.body);
  }

  const { refresh, access: accessToken } = await tokenService.generateAuthTokens(user);

  res.cookie("REFRESH_TOKEN", JSON.stringify(refresh.token), {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: refresh.expires,
  });

  user["password"] = null;

  res.status(httpStatus.CREATED).send({ user, accessToken });
});

const login = catchAsync(async (req, res) => {
  const userType = req.params.userType;
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password, userType);

  const { refresh, access: accessToken } = await tokenService.generateAuthTokens(user);

  res.cookie("REFRESH_TOKEN", JSON.stringify(refresh.token), {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: refresh.expires,
  });

  res.status(httpStatus.OK).send({ user, accessToken });
});

module.exports = { register, login };
