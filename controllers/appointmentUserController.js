const Appointment = require('../models/appointment.model.js');
const User = require('../models/user.model.js');

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

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAppointmentsByUser,
  getUserById
}