const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"]
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  }
},
  {
    timestamps: true
  });

const User = mongoose.model("User", UserSchema);
module.exports = User;