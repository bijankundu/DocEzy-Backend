const express = require("express");
const auth = require("./../middlewares/auth");
const doctorController = require("./../controllers/doctor.controller");

const router = express.Router();

router.get("/all", auth, doctorController.getDoctors);
router.get("/:specialist", auth, doctorController.getSpecialist);

module.exports = router;
