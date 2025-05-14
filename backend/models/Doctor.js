const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    specialization: { type: String, required: true },
    department: { type: String, required: true },
});

module.exports = mongoose.model('Doctor', doctorSchema);
