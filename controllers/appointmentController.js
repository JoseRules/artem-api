const Appointment = require('../models/appointment.model.js');
const User = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');


const getAllAppointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "firstname lastname email")
      .populate("patient", "firstname lastname email");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

const createAppointment = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { doctor, patient, notes, date } = req.body;

    const doctorUser = await User.findById(doctor);
    if (!doctorUser || doctorUser.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor" });
    }

    const patientUser = await User.findById(patient);
    if (!patientUser) {
      return res.status(400).json({ message: "Invalid patient" });
    }

    const conflict = await Appointment.findOne({
      date,
      $or: [
        { doctor },
        { patient }
      ],
      status: { $ne: "cancelled" }
    });

    if (conflict) {
      return res.status(400).json({
        message: "Time slot already booked"
      });
    }

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

const deleteAppointment = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    await Appointment.deleteOne({ _id });
    res.json({ message: 'Appointment has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateAppointment = asyncHandler(async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: _id },
      updateData,
      { returnDocument: 'after' }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})
module.exports = {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment
}