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
  }
`;

export const GAME_HEADERS = [
  'Date',
  'Start Time',
  'Game Clock',
  'Away Team',
  'Away Attempts',
  'Away Carries',
  'Away Completions',
  'Away Passing Yards',
  'Away Rushing Yards',
  'Home Team',
  'Home Attempts',
  'Home Carries',
  'Home Completions',
  'Home Passing Yards',
  'Home Rushing Yards',
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

function todayDate() {
  return moment.tz('America/Los_Angeles').format('YYYY-MM-DD');
}


const Games = (): JSX.Element => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || todayDate()
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { date } })
  if (loading) return <p>Loading...</p>
  return (
    <>
      <div>Games</div>
      <table>
        <thead>
          <tr>{GAME_HEADERS.map((header, index) => <th key={index}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {data.games.map(game => (
            <tr key={game.id}>
              <td>{game.date}</td>
              <td>{convertTime(game.start_time)}</td>
              <td>{game.game_clock}</td>
              <TeamRow team={game.away_team} />
              <StatRow stat={game.away_full_game_stat} />
              <TeamRow team={game.home_team} />
              <StatRow stat={game.home_full_game_stat} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const TeamRow = ({ team }) => {
  if (!team) {
    return null
  }
  return (
    <>
      <td>{team.name}</td>
    </>
  )
}

const StatRow = ({ stat }) => {
  if (!stat) {
    return null
  }
  return (
    <>
      <td>{stat.attempts}</td>
      <td>{stat.completions}</td>
      <td>{stat.carries}</td>
      <td>{stat.passing_yards}</td>
      <td>{stat.rushing_yards}</td>
    </>
  )
}

export default Games