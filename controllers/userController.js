const { z } = require("zod");
const User = require('../models/user.model.js');

const userSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
});

const createNewUser = async (req, res) => {
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

      res.status(500).json({
        message: "Internal server error"
      });
    })
}

module.exports = {
  createNewUser
}