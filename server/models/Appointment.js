const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
    patientName: {type: String, required: true, trim: true},
    patientLastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    phoneNumber: {type: String, required: true, trim: true},
    service: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    status: {type: String, enum: ["pending", "confirmed", "rejected"], default: "pending"},
    notes: {type: String, trim: true}
},
{timestamps: true}
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;