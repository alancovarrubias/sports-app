import React, { useContext } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { gql } from '@apollo/client'
import { getRoute, Page } from '../../Routes'
import SportContext from '../../contexts/SportContext'
import { Sport } from '../../const'
import NbaGame from './NbaGame'
import MlbGame from './MlbGame'

export interface IGameProps {
  sport: Sport
  game_id: string
}
interface IParamTypes {
  game_id: string
  season_id: string
}
const Game = () => {
  const [sport] = useContext(SportContext)
  const { season_id, game_id } = useParams<IParamTypes>()
  const search = useLocation().search
  const props = {
    sport,
    game_id,
  }
  const GameComponent = sport == Sport.NBA ? NbaGame : MlbGame
  const gamesRoute = getRoute(Page.Games, { search, season_id })
  return (
    <>
      <Link to={gamesRoute}>Games</Link>
      <GameComponent {...props} />
    </>
  )
}

export default Game

export const GET_GAME_QUERY = gql`
  fragment GameTeamStat on Team {
    id
    name
    sport
    stat {
      ... on NbaStat {
        pts
      }
      ... on MlbStat {
        pitching {
          r
        }
        batting {
          r
        }
      }
    }
  }
  fragment GamePlayerStat on Player {
    id
    name
    sport
    stat {
      ... on NbaStat {
        sp
        fg
        fga
        fg3
        fg3a
        pts
        ortg
        drtg
      }
      ... on MlbStat {
        pitching {
          ip
          h
          r
          er
          bb
          so
          hr
          era
        }
        batting {
          ab
          r
          h
          rbi
          bb
          so
          pa
          ba
          obp
          slg
          ops
        }
      }
    }
  }
  query GetGame($sport: String!, $game_id: ID!) {
    game(sport: $sport, game_id: $game_id) {
      id
      date
      away_team {
        ...GameTeamStat
      }
      home_team {
        ...GameTeamStat
      }
      away_players {
        ...GamePlayerStat
      }
      home_players {
        ...GamePlayerStat
      }
      sport
    }
  }
`
