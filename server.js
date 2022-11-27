const EventEmitter = require('events'), emitter = new EventEmitter();
require('moment-precise-range-plugin');
const moment = require('moment')

const [userDate] = process.argv.slice(2);
const format = 'YYYY-MM-DD HH';

const getDateFromDateString = dateString => {
    const [hour, day, month, year] = dateString.split('-')
    return new Date(Date.UTC(year, month - 1, day, hour))
}

const dateInFuture = getDateFromDateString(userDate);

const showRemainingTime = dateInFuture => {
    const dateNow = new Date();

    if (dateNow >= dateInFuture) {
        emitter.emit('timerEnd');
    } else {
        const currentDateFormatted = moment(dateNow, format);
        const futureDateFormatted = moment(dateInFuture, format);
        console.log(moment.preciseDiff(currentDateFormatted, futureDateFormatted));
    }
}

const timerId = setInterval(() => {
    emitter.emit('timerTick', dateInFuture);
}, 500);

const showTimerDone = timerId => {
    clearInterval(timerId);
    console.log('STOP');
}

emitter.on('timerTick', showRemainingTime)
emitter.on('timerEnd', () => {
    showTimerDone(timerId);
})