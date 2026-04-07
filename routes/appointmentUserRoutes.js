const express = require('express');
const { getAppointmentsByUser } = require('../controllers/appointmentUserController');
const router = express.Router();


router.get('/user/:userId', getAppointmentsByUser);

module.exports = router;