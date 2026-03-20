const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

router.route('/')
  //.get(userController.getAllUsers)
  .post(appointmentController.createAppointment)
//.patch(userController.updateUser)
//.delete(userController.deleteUser);

module.exports = router;