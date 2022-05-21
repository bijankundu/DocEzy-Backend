const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const { tokenTypes } = require("./../constants");

const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET) => {
  const payload = {
    userId,
    type,
    iat: dayjs().unix(),
    expires: expires.unix(),
  };

  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (userId) => {
  const accessTokenExpires = dayjs().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, "minutes");
  const accessToken = generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = dayjs().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, "days");
  const refreshToken = generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return;
  }
};

module.exports = { generateAuthTokens, verifyToken };
