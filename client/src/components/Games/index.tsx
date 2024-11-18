import React from 'react'
import { useQuery } from '@apollo/client'
import { GAMES_QUERY } from 'app/apollo/queries'
import GameTable from './GameTable'
import Actions from './Actions'
import { todayDate } from 'app/helpers/date'
import _ from 'lodash'

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_QUARTER = 15
const minutesPassedRatio = (game_clock) => {
  const time = game_clock.match(/\d{1,2}:\d{2}/)?.[0];
  if (!time) {
    return 1
  }
  const [minutes, seconds] = time.split(':')
  const totalSeconds = minutes * SECONDS_IN_MINUTE + +seconds
  return 1 - (totalSeconds / (SECONDS_IN_MINUTE * MINUTES_IN_QUARTER))
}

const getQuarterOrderNum = (game_clock) => {
  const quarterString = game_clock.match(/\d+(st|nd|rd|th)/)[0]
  const quarter = parseInt(quarterString[0]);
  switch (quarter) {
    case 2:
      return 1
    case 1:
      return 3
    default:
      return 4
  }
}

export const getOrder = (game_clock) => {
  if (game_clock == 'Halftime') return -1
  if (game_clock == 'Second Half') return 4
  if (game_clock == 'Not Started') return 5
  if (game_clock.includes('Final')) return 6
  return getQuarterOrderNum(game_clock) - minutesPassedRatio(game_clock)
}

export default () => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || todayDate();
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { date } })
  if (loading) return <p>Loading...</p>
  const games = [...data.games].sort((game1, game2) => getOrder(game1.game_clock) - getOrder(game2.game_clock))
  return (
    <>
      <Actions date={date} />
      <GameTable games={games} />
    </>
  )
}