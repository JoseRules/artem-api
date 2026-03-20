const { z } = require("zod");
const User = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');

const userSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.email(),
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const { email, specialty } = req.query;
    const query = {};
    if (email) {
      query.email = email;
    }
    if (specialty) {
      query.specialty = specialty;
    }
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


const createNewUser = asyncHandler(async (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    const formattedErrors = result.error.issues.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(400).json({ errors: formattedErrors });
  }
  User.create(req.body)
    .then(item => res.status(201).json(item))
    .catch(error => {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          message: `${field} already exists`,
        });
      }
      if (error.name === "ValidationError") {

        const errors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));

        return res.status(400).json({
          message: "Validation failed",
          errors
        });
      }

      res.status(500).json({
        message: "Internal server error"
      });
    })
})

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: _id },
      updateData,
      { returnDocument: 'after' }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    await User.deleteOne({ _id });
    res.json({ message: 'User has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = {
  createNewUser,
  getAllUsers,
  updateUser,
  deleteUser
}