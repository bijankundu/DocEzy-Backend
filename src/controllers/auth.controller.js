const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const { createUser } = require("./../services/user.service");
const { createDoctor } = require("./../services/doctor.service");
const { generateAuthTokens } = require("./../services/token.service");

const register = catchAsync(async (req, res) => {
  const userType = req.params.userType;
  let user = null;

  if (userType === "doctor") {
    user = await createDoctor(req.body);
  } else {
    user = await createUser(req.body);
  }

  const { refresh, access: accessToken } = await generateAuthTokens(user);

  console.log({ refresh, accessToken });

  res.cookie("REFRESH_TOKEN", JSON.stringify(refresh.token), {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: refresh.expires,
  });

  user["password"] = null;

  res.status(httpStatus.CREATED).send({ user, accessToken });
});

module.exports = { register };
