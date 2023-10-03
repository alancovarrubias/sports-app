import React from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'

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
  'Date',
  'Start Time',
  'Game Clock',
  'Kicked',
  `Away vs Home`,
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

function convertTime(utcDateStr) {
  const utcDate = new Date(utcDateStr);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(utcDate);
}
const SECONDS_IN_MINUTE = 60
const MINUTES_IN_QUARTER = 60

export function todayDate() {
  return moment.tz('America/Los_Angeles').format('YYYY-MM-DD');
}

function getSeconds(time) {
  const split = time.split(':')
  return parseInt(split[0]) * SECONDS_IN_MINUTE + parseInt(split[1])
}

function getQuarter(inputString) {
  const quarterMatch = inputString.match(/\d+(st|nd|rd|th)/)
  return parseInt(quarterMatch[0][0]);
}

const getColor = (game, index) => {
  const order = getOrder(game.game_clock)
  const oddEven = index % 2
  switch (Math.floor(order)) {
    case -1:
      return oddEven ? 'red' : 'palevioletred'
    case 0:
    case 1:
      return oddEven ? 'yellow' : 'lightyellow'
    case 2:
      return oddEven ? 'orangered' : 'orange'
    case 4:
      return oddEven ? 'rgb(156,225,104)' : 'rgb(147,213,186)'
    case 5:
      return oddEven ? 'dodgerblue' : 'royalblue'
  }
}

export const getOrder = (inputString) => {
  const timeMatch = inputString.match(/\d{1,2}:\d{2}/);
  if (timeMatch) {
    const time = timeMatch[0];
    const quarter = getQuarter(inputString)
    const seconds = getSeconds(time) / (SECONDS_IN_MINUTE * MINUTES_IN_QUARTER)
    let orderNum
    switch (quarter) {
      case 2:
        orderNum = 1
        break
      case 1:
        orderNum = 2
        break
      case 3:
      case 4:
        orderNum = 3
        break
    }
    return orderNum - (1 - seconds)
  } else {
    if (inputString == 'Halftime') return -1
    if (inputString == 'Not Started') return 4
    if (inputString == 'Final') return 5
  }
}

const Games = (): JSX.Element => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || todayDate()
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { date } })
  if (loading) return <p>Loading...</p>
  const sortedGames = [...data.games].sort((game1, game2) => getOrder(game1.game_clock) - getOrder(game2.game_clock))
  return (
    <>
      <div>{date} Games</div>
      <table>
        <Header />
        <tbody>
          {sortedGames.map((game, index) => (
            <GameRow key={game.id} game={game} index={index} />)
          )}
        </tbody>
      </table>
    </>
  )
}

const Header = () => {
  const headers = [...GAME_HEADERS, ...STAT_HEADERS, ...STAT_HEADERS]
  return (
    <thead>
      <tr>
        <th colSpan={GAME_HEADERS.length}>Game Stats</th>
        <th colSpan={STAT_HEADERS.length}>First Half</th>
        <th colSpan={STAT_HEADERS.length}>Full Game</th>
      </tr>
      <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
    </thead>
  )
}

const GameRow = ({ game, index }) => {
  const style = { backgroundColor: getColor(game, index) }
  return (
    <>
      <tr key={game.id} style={style}>
        <td rowSpan={2}>{game.date}</td>
        <td rowSpan={2}>{convertTime(game.start_time)}</td>
        <td rowSpan={2}>{game.game_clock}</td>
        <td rowSpan={2}>{game.kicked}</td>
        <TeamRow team={game.away_team} />
        <StatRow stat={game.away_first_half_stat} />
        <StatRow stat={game.away_full_game_stat} />
      </tr>
      <tr style={style}>
        <TeamRow team={game.home_team} />
        <StatRow stat={game.home_first_half_stat} />
        <StatRow stat={game.home_full_game_stat} />
      </tr>
    </>
  )

}

const TeamRow = ({ team }) => {
  if (!team) {
    return <td />
  }
  return <td>{team.name}</td>
}

const StatRow = ({ stat }) => {
  if (!stat) {
    stat = {}
  }
  return (
    <>
      <td>{stat.attempts}</td>
      <td>{stat.completions}</td>
      <td>{stat.carries}</td>
      <td>{stat.passing_yards}</td>
      <td>{stat.rushing_yards}</td>
      <td>{stat.score}</td>
      <td>{stat.total_plays}</td>
      <td>{stat.total_yards}</td>
      <td>{stat.ave_per_car}</td>
      <td>{stat.ave_per_att}</td>
      <td>{stat.ave_per_play}</td>
      <td>{stat.longest_rush}</td>
      <td>{stat.longest_pass}</td>
      <td>{stat.typa}</td>
      <td>{stat.typai}</td>
      <td>{stat.typc}</td>
      <td>{stat.typp}</td>
    </>
  )
}

export default Games