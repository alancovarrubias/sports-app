import { MockedResponse } from '@apollo/client/testing'
import { GET_GAME } from '@app/apollo/queries'
import { Sport } from '@app/const'
import Season from '@mocks/models/Season'
import Game from '@mocks/models/Game'

const GameMock: MockedResponse[] = [
  {
    request: {
      query: GET_GAME,
      variables: {
        sport: Sport.NBA,
        game_id: Game.id,
      },
    },
    result: {
      data: {
        game: {
          id: '1',
          date: '2020',
          sport: Sport.NBA,
          away_team: {
            id: '1',
            name: 'Clippers',
            sport: Sport.NBA,
            __typename: 'Team',
            stat: { pts: 84 },
          },
          home_team: {
            id: '2',
            name: 'Lakers',
            sport: Sport.NBA,
            __typename: 'Team',
            stat: { pts: 94 },
          },
          away_players: [
            {
              id: '1',
              name: 'Kawhi Leonard',
              sport: Sport.NBA,
              __typename: 'Player',
              stat: {
                sp: 360,
                fg: 8,
                fga: 12,
                fg3: 5,
                fg3a: 10,
                pts: 44,
                ortg: 102,
                drtg: 98,
              },
            },
          ],
          home_players: [
            {
              id: '2',
              name: 'Anthony Davis',
              sport: Sport.NBA,
              __typename: 'Player',
              stat: {
                sp: 360,
                fg: 8,
                fga: 12,
                fg3: 5,
                fg3a: 10,
                pts: 44,
                ortg: 102,
                drtg: 98,
              },
            },
          ],
        },
      },
    },
  },
]

export default GameMock
