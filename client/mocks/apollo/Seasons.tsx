import { MockedResponse } from '@apollo/client/testing'
import { GET_SEASONS } from '@app/apollo/queries'
import { Sport } from '@app/const'

const SeasonsMock: MockedResponse[] = [
  {
    request: {
      query: GET_SEASONS,
      variables: {
        sport: Sport.NBA,
      },
    },
    result: {
      data: {
        seasons: [
          {
            id: '1',
            year: 2020,
            sport: Sport.NBA,
          },
        ],
      },
    },
  },
]

export default SeasonsMock
