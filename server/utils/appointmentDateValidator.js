const clinicAvailability = require("../config/clinicAvailability")

const appointmentDateValidation = (date) => {
    const appointmentDate = new Date(date);

    if(isNaN(appointmentDate.getTime()) || appointmentDate.getTime() <= Date.now()) {
            return ({isAvailable: false, message: "Wybrano błędną datę"})
        }

    if(!clinicAvailability.schedule.some((day) => day.dayOfWeek === appointmentDate.getDay())) {
         return ({isAvailable: false, message: "Gabinet nie pracuje w tym dniu"})
    }

    const appointmentTimeInMinutes = appointmentDate.getHours() * 60 + appointmentDate.getMinutes();

    if(appointmentTimeInMinutes < clinicAvailability.workingHours.openingTime || (appointmentTimeInMinutes > clinicAvailability.workingHours.closingTime - clinicAvailability.interval)) {
        return ({isAvailable: false, message: "Gabinet nie pracuję w tej godzinie"})
    }

    if(appointmentTimeInMinutes % clinicAvailability.interval !== 0) {
         return ({isAvailable: false, message: "Wybrano złą godzine wizyty"})
    }


     return ({isAvailable: true, message: "Wybrana data jest prawidłowa"}) 
} 

module.exports = appointmentDateValidation;