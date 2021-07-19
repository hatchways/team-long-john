const express = require("express");
const router = express.Router();

const {
  fetchAppointments,
  createAppointment,
} = require("../controllers/appointment");

router.route("/").get(fetchAppointments);
router.route("/").post(createAppointment);

module.exports = router;
