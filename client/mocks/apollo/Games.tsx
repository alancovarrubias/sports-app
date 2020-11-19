import { MockedResponse } from '@apollo/client/testing'
import { GET_GAMES_QUERY } from '@app/apollo/queries'
import { Sport } from '@app/const'
import Season from '@mocks/models/Season'

const GamesMock: MockedResponse[] = [
  {
    request: {
      query: GET_GAMES_QUERY,
      variables: {
        sport: Sport.NBA,
        season_id: Season.id,
        limit: 100,
        offset: 0,
      },
    },
    result: {
      data: {
        games: [
          {
            id: '1',
            date: '2020',
            sport: Sport.NBA,
            __typename: 'Game',
            away_team: {
              __typename: 'Team',
              name: 'Clippers',
              stat: { pts: 84 },
            },
            home_team: {
              __typename: 'Team',
              name: 'Lakers',
              stat: { pts: 94 },
            },
          },
        ],
      },
    },
  },
]

export default GamesMock
