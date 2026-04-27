const express = require('express');
const { getAppointmentsByUser, getUserById } = require('../controllers/appointmentUserController');
const router = express.Router();


router.get('/:userId', getAppointmentsByUser);

module.exports = router;