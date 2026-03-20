const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  profilePic: {
    type: String,
    required: false
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required."]
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required."]
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required."]
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, "Gender is required."],
  },
  phone: {
    type: String,
    required: [true, "Phone is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true
  },
  role: {
    type: String,
    enum: ['doctor', 'patient'],
    required: [true, "Role is required."],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  diseases: {
    type: String
  },
  allergies: {
    type: String
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  specialty: {
    type: String,
    required: function () {
      return this.role === 'doctor';
    }
  },
  npi: {
    type: String,
    required: function () {
      return this.role === 'doctor';
    }
  },
  experience: {
    type: Number,
  },
  price: {
    type: Number
  },
  location: {
    type: String
  },
  languages: {
    type: String
  },
  availability: [
    {
      day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
      },
      start: Number,
      end: Number
    }
  ]
},
  {
    timestamps: true
  });

const User = mongoose.model("User", UserSchema);
module.exports = User;