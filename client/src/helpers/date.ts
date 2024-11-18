import moment from 'moment-timezone'

const TIMEZONE = 'America/Los_Angeles'

export function todayDate() {
    return moment.tz(TIMEZONE).format('YYYY-MM-DD')
}

export function changeDate(date, numDays) {
    const momentDate = moment.tz(date, TIMEZONE);
    return momentDate.clone().add(numDays, 'day').format('YYYY-MM-DD');
}

export function convertTime(utcDateStr) {
    const utcDate = new Date(utcDateStr);
    return new Intl.DateTimeFormat('en-US', {
        timeZone: TIMEZONE,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(utcDate);
}