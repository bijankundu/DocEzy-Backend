const express = require("express");
const authRoute = require("./auth.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", (req, res) => {
  res.status(200).send(`Server running. Current time - ${new Date()}`);
});

module.exports = router;
