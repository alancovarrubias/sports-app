import { gql } from '@apollo/client';

export const TEAM_DATA = gql`
  fragment TeamData on Team {
    id
    name
  }
`

export const STAT_DATA = gql`
  fragment StatData on Stat {
    id
    c_att
    carries
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

export const LINE_DATA = gql`
  fragment LineData on Line {
    id
    total
    spread
  }
`

export const GAME_DATA = gql`
  fragment GameData on Game {
    id
    date
    start_time
    kicking_team {
      ...TeamData
    }
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
    full_game_opener {
      ...LineData
    }
    full_game_closer {
      ...LineData
    }
  }
  ${TEAM_DATA}
  ${STAT_DATA}
  ${LINE_DATA}
`;