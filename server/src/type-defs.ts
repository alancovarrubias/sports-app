import { gql } from 'apollo-server'
export default gql`
  type Query {
    users: [User]!
    seasons(sport: String!): [Season]!
    games(sport: String!, season_id: ID!, offset: Int, limit: Int): [Game]!
    game(sport: String!, game_id: ID!): Game!
  }
  type Mutation {
    login(username: String!, password: String!): AuthPayload
  }
  type AuthPayload {
    token: String
    user: User
  }
  type User {
    id: ID!
    username: String!
  }
  type Season {
    id: ID!
    year: Int!
    sport: String!
  }
  type Team {
    id: ID!
    name: String!
    abbr: String!
    city: String!
    stat: Stat
    sport: String!
  }
  type Player {
    id: ID!
    name: String!
    abbr: String!
    position: String!
    stat: Stat
    sport: String!
  }
  type Game {
    id: ID!
    date: String!
    away_team: Team!
    home_team: Team!
    away_players: [Player]!
    home_players: [Player]!
    lines: [Line]!
    preds: [Pred]!
    sport: String!
  }
  type NbaStat {
    sp: Int
    fg: Int
    fga: Int
    fg3: Int
    fg3a: Int
    ft: Int
    fta: Int
    orb: Int
    drb: Int
    ast: Int
    stl: Int
    blk: Int
    tov: Int
    pf: Int
    pts: Int
    ortg: Int
    drtg: Int
  }
  type MlbStat {
    pitching: PitchingStat
    batting: BattingStat
  }
  type PitchingStat {
    ip: Float
    h: Int
    r: Int
    er: Int
    bb: Int
    so: Int
    hr: Int
    era: Float
  }
  type BattingStat {
    ab: Int
    r: Int
    h: Int
    rbi: Int
    bb: Int
    so: Int
    pa: Int
    ba: Float
    obp: Float
    slg: Float
    ops: Float
  }
  type Line {
    bookie: String
    total: Float
    spread: Float
  }
  type Pred {
    desc: String
    away_score: Float
    home_score: Float
  }
  union Stat = NbaStat | MlbStat
`
