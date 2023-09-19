import React from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'

export const GAMES_QUERY = gql`
  query Games($seasonId: String!) {
    games(seasonId: $seasonId) {
      id
      date
      start_time
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
const utcDateStr = "2023-09-15T00:15:00.000Z";

// Create a Date object from the UTC string

// Convert to PST (Pacific Standard Time) without seconds
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
  return utcDate
}


const Games = (): JSX.Element => {
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { seasonId: '1' } })
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
              <td>{game.away_team.name}</td>
              <StatRow stat={game.away_full_game_stat} />
              <td>{game.home_team.name}</td>
              <StatRow stat={game.home_full_game_stat} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const StatRow = ({ stat }) => {
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