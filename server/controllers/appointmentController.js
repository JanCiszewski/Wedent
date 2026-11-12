const { default: mongoose } = require("mongoose");
const Appointment = require("../models/Appointment");
const AppointmentSlot = require("../models/AppointmentSlot");
const appointmentDateValidation = require("../utils/appointmentDateValidator");

const createAppointment = async (req, res) => {
    let session;
    try {
        session = await mongoose.startSession();
        const {patientName, patientLastName, email, phoneNumber, service, date, notes} = req.body;
        const appointmentData = {
            patientName,
            patientLastName,
            email,
            phoneNumber,
            service,
            date,
            notes
        }

        const allowedServices = [
            "ortodoncja",
            "implanty",
            "protetyka",
            "wybielanie-zebow",
            "stomatologia-estetyczna",
            "mikroskop",
            "konsultacja"
        ];

        if(typeof appointmentData.patientName !== "string" || appointmentData.patientName.trim().length === 0){
            return res.status(400).json({
                message: "Błędne imie pacjenta"
            })
        }

        if(typeof appointmentData.patientLastName !== "string" || appointmentData.patientLastName.trim().length === 0){
            return res.status(400).json({
                message: "Błędne nazwisko pacjenta"
            })
        }

        if(typeof appointmentData.email !== "string" || !appointmentData.email.includes("@")){
            return res.status(400).json({
                message: "Błędny adres email"
            })
        }

        if(typeof appointmentData.phoneNumber !== "string" || /[^0-9 +\-]/.test(appointmentData.phoneNumber) || appointmentData.phoneNumber.replace(/\D/g, "").length < 9 ){
            return res.status(400).json({
                message: "Błędny numer telefonu"
            })
        }

        if(typeof appointmentData.service !== "string" || !allowedServices.includes(appointmentData.service)) {
            return res.status(400).json({
                message: "Wybrano nieprawidłową usługę"
            })
        }

        const dateValidationResult = appointmentDateValidation(appointmentData.date);

        if(!dateValidationResult.isAvailable) {
            return res.status(400).json({
            message: dateValidationResult.message
        })
        }

        await session.withTransaction( async () => {
            const appointment = new Appointment(appointmentData)
            const existingSlot = await AppointmentSlot.findOneAndUpdate({date: appointmentData.date, status: "available"}, {status: "booked", appointmentId: appointment._id}, {returnDocument: "after", session})
            if(!existingSlot) {
                const error = new Error("Termin jest już zajęty");
                error.code = "APPOINTMENT_SLOT_CONFLICT";
                throw error;
            }
            await appointment.save({session})

        })

        return res.status(201).json({
            message: "Rezerwacja została utworzona pomyślnie",
            appointment
        })
    } catch(error) {

        if(error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
            message: "Błąd walidacji"
        })
        }

        if (error.code === "APPOINTMENT_SLOT_CONFLICT") {
            return res.status(409).json({ message: error.message });
        }

        console.error(error);
        return res.status(500).json({
            message: "Błąd serwera"
        })
    } finally {
            if (session){
                await session.endSession();
            }
    }
        
}

module.exports = {
    createAppointment
}