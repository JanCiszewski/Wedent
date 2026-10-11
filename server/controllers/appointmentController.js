const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {
    try {

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

        if(isNaN(new Date(appointmentData.date).getTime()) || new Date(appointmentData.date).getTime() <= Date.now()) {
            return res.status(400).json({
                message: "Wybrano błędną datę"
            })
        }

        const appointment = new Appointment(appointmentData)
        await appointment.save()
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

        console.error(error);
        return res.status(500).json({
            message: "Błąd serwera"
        })
    }
}

module.exports = {
    createAppointment
}