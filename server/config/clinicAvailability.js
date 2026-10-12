const workingDays = [1, 2, 3, 4, 5];

const workingHours = {
    openingTime: 600,
    closingTime: 1080
};

const interval = 30;

const schedule = workingDays.map((day) => {
    return {dayOfWeek: day, openingTime: workingHours.openingTime, closingTime: workingHours.closingTime}
})

module.exports = {
    schedule,
    interval
}