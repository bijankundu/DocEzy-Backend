const express = require("express");
const authRoutes = require("./auth.route");
const doctorRoutes = require("./doctor.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", (req, res) => {
  res.status(200).send(`Server running. Current time - ${new Date()}`);
});

module.exports = router;
