const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    image: { type: String, default: null },
    document: { type: String, default: null },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Foreign key to Doctor
});

module.exports = mongoose.model('Patient', patientSchema);
