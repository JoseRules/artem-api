const Appointment = require('../models/appointment.model.js');

const getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({
      $or: [
        { doctor: userId },
        { patient: userId }
      ]
    })
      .populate('doctor', 'firstname lastname email')
      .populate('patient', 'firstname lastname email')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAppointmentsByUser
}