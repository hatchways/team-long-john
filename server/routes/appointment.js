const express = require("express");
const router = express.Router();

const {
  fetchAppointments,
  createAppointment,
  fetchAppointmentById,
  deleteAppointmentById,
} = require("../controllers/appointment");

router.route("/").get(fetchAppointments);
router.route("/").post(createAppointment);
router.route("/:id").get(fetchAppointmentById);
router.route("/:id").delete(deleteAppointmentById);

module.exports = router;
