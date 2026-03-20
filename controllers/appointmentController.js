const Appointment = require('../models/appointment.model.js');
const asyncHandler = require('express-async-handler');

const createAppointment = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { doctor, patient, notes, date } = req.body;
    const appointment = await Appointment.create({
      doctor,
      patient,
      notes,
      date
    });
    console.log(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  createAppointment
}