const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, match: /.+@.+\..+/ },
    phoneNumber: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, min: 0 },
    joiningDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
