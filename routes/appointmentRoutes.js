const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

router.route('/')
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment)
  .patch(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;