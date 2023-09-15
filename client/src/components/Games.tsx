import React from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client'

export const GAMES_QUERY = gql`
  query Games($seasonId: String!) {
    games(seasonId: $seasonId) {
      id
      date
      away_team {
        id
        name
      }
      home_team {
        id
        name
      }
    }
  }
`;

export const GAME_HEADERS = [
  'Date',
  'Away Team',
  'Home Team'
]

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
              <td>{game.away_team.name}</td>
              <td>{game.home_team.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Games