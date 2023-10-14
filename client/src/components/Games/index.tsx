import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import GameTable from './GameTable'

export const GAMES_QUERY = gql`
  query Games($date: String!) {
    games(date: $date) {
      id
      date
      start_time
      kicked
      game_clock
      away_team {
        ...TeamData
      }
      home_team {
        ...TeamData
      }
      away_full_game_stat {
        ...StatData
      }
      home_full_game_stat {
        ...StatData
      }
      away_first_half_stat {
        ...StatData
      }
      home_first_half_stat {
        ...StatData
      }
    }
  }
  fragment TeamData on Team {
    id
    name
  }
  fragment StatData on Stat {
    id
    attempts
    carries
    completions
    passing_yards
    rushing_yards
    score
    total_plays
    total_yards
    ave_per_car
    ave_per_att
    ave_per_play
    longest_rush
    longest_pass
    typa
    typai
    typc
    typp
  }
`;

export const GAME_HEADERS = [
  'Start Time',
  'Game Clock',
  'Kicked',
  'Matchups'
]

export const STAT_HEADERS = [
  `Attempts`,
  `Completions`,
  `Carries`,
  `Passing Yards`,
  `Rushing Yards`,
  `Score`,
  `Total Plays`,
  `Total Yards`,
  `Ave Per Car`,
  `Ave Per Att`,
  `Ave Per Play`,
  'Longest Rush',
  'Longest Pass',
  `TYPA`,
  `TYPAI`,
  `TYPC`,
  `TYPP`,
]

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_QUARTER = 15
const TIMEZONE = 'America/Los_Angeles'

export function todayDate() {
  return moment.tz(TIMEZONE)
}

function changeDate(date, numDays) {
  return date.clone().add(numDays, 'day')
}

function getSeconds(time) {
  const split = time.split(':')
  return parseInt(split[0]) * SECONDS_IN_MINUTE + parseInt(split[1])
}

const getColor = (game, index) => {
  const order = getOrder(game.game_clock)
  const oddEven = index % 2
  switch (Math.floor(order)) {
    case -1:
      return oddEven ? 'red' : 'palevioletred'
    case 0:
    case 1:
    case 2:
      return oddEven ? 'yellow' : 'lightyellow'
    case 3:
      return oddEven ? 'orangered' : 'orange'
    case 4:
      return oddEven ? 'rgb(156,225,104)' : 'rgb(147,213,186)'
    case 5:
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
        orderNum = 2
        break
    }
    const timeMatch = gameClock.match(/\d{1,2}:\d{2}/);
    if (!timeMatch) {
      return orderNum
    }
    const time = timeMatch[0];
    const seconds = getSeconds(time)
    const secondRatio = 1 - (seconds / (SECONDS_IN_MINUTE * MINUTES_IN_QUARTER))
    return orderNum - secondRatio
  } else {
    if (gameClock == 'Halftime') return -1
    if (gameClock == 'Second Half') return 3
    if (gameClock == 'Not Started') return 4
    if (gameClock.includes('Final')) return 5
  }
}

function convertTime(utcDateStr) {
  const utcDate = new Date(utcDateStr);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(utcDate);
}

const Games = (): JSX.Element => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || todayDate().format('YYYY-MM-DD');
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { date } })
  const history = useHistory()
  const onPreviousClick = () => {
    const startDate = moment.tz(date, TIMEZONE);
    const nextDate = changeDate(startDate, -1).format('YYYY-MM-DD');
    history.push(`/games?date=${nextDate}`)
  }
  const onNextClick = () => {
    const startDate = moment.tz(date, TIMEZONE);
    const nextDate = changeDate(startDate, 1).format('YYYY-MM-DD');
    history.push(`/games?date=${nextDate}`)
  }
  const onRefresh = () => {
    window.location.reload();
  }
  if (loading) return <p>Loading...</p>
  const sortedGames = [...data.games].sort((game1, game2) => getOrder(game1.game_clock) - getOrder(game2.game_clock))
  const styledGames = sortedGames.map((game, index) => (
    {
      ...game,
      start_time: convertTime(game.start_time),
      style: { backgroundColor: getColor(game, index) }
    }
  ))
  return (
    <>
      <div>{date} Games</div>
      <button onClick={onRefresh}>Refresh</button>
      <button onClick={onPreviousClick}>Previous Day</button>
      <button onClick={onNextClick}>Next Day</button>
      <GameTable games={styledGames} />
    </>
  )
}

export default Games