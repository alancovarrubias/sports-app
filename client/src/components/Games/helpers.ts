import moment from 'moment-timezone'

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_QUARTER = 15
const TIMEZONE = 'America/Los_Angeles'

export function todayDate() {
  return moment.tz(TIMEZONE).format('YYYY-MM-DD')
}

export function changeDate(date, numDays) {
  const momentDate = moment.tz(date, TIMEZONE);
  return momentDate.clone().add(numDays, 'day').format('YYYY-MM-DD');
}

function getSeconds(time) {
  const split = time.split(':')
  return parseInt(split[0]) * SECONDS_IN_MINUTE + parseInt(split[1])
}

export const getColor = (game_clock, index) => {
  const oddEven = index % 2
  switch (true) {
    case /Halftime/.test(game_clock):
      return oddEven ? 'red' : 'palevioletred'
    case /(1st|2nd)/.test(game_clock):
      return oddEven ? 'yellow' : 'lightyellow'
    case /Second Half/.test(game_clock):
      return oddEven ? 'orangered' : 'orange'
    case /Not Started/.test(game_clock):
      return oddEven ? 'rgb(156,225,104)' : 'rgb(147,213,186)'
    case /Final/.test(game_clock):
      return oddEven ? 'dodgerblue' : 'royalblue'
  }
}

export const getOrder = (gameClock) => {
  const quarterMatch = gameClock.match(/\d+(st|nd|rd|th)/)
  if (quarterMatch) {
    const quarter = parseInt(quarterMatch[0][0]);
    let orderNum
    switch (quarter) {
      case 2:
        orderNum = 1
        break
      case 1:
        orderNum = 3
        break
      default:
        return 4
    }
    const timeMatch = gameClock.match(/\d{1,2}:\d{2}/);
    if (!timeMatch) {
      return orderNum - 1
    }
    const time = timeMatch[0];
    const seconds = getSeconds(time)
    const secondRatio = 1 - (seconds / (SECONDS_IN_MINUTE * MINUTES_IN_QUARTER))
    return orderNum - secondRatio
  } else {
    if (gameClock == 'Halftime') return -1
    if (gameClock == 'Second Half') return 4
    if (gameClock == 'Not Started') return 5
    if (gameClock.includes('Final')) return 6
  }
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

export function kickedTeam(game) {
  if (game.kicked == 'away') {
    return game.away_team.name
  } else if (game.kicked == 'home') {
    return game.home_team.name
  }
}