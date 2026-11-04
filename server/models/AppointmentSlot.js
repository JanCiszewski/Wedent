const mongoose = require("mongoose");
const {Schema} = mongoose;

const AppointmentSlotSchema = new Schema ({
    date: {type: Date, unique: true, required: true},
    status: {type: String, enum: ["available", "booked", "blocked"], default: "available"},
    appointmentId: {type: Schema.Types.ObjectId, default: null, ref: "Appointment"},
    blockedId: {type: Schema.Types.ObjectId, default: null}
})

const AppointmentSlot = mongoose.model("AppointmentSlot", AppointmentSlotSchema);

module.exports = AppointmentSlot;