const express = require('express');
const router = express.Router();

const { fetchAppointments, createAppointment } = require('../controllers/appointment');

router.route('/appointment/:email').get(fetchAppointments);
router.route('/appointment').post(createAppointment);

module.exports = router;