import NbaAPI from './nbaAPI'
import MlbAPI from './mlbAPI'
import { SEASONS, GAMES, GAME } from '../const'

export default () => {
  return {
    NBA: new NbaAPI(),
    MLB: new MlbAPI(),
  }
}

export const fetchData = async (resource, { args, dataSources }) => {
  const { sport } = args
  const dataSource = dataSources[sport]
  const data = await fetchResource(resource, { dataSource, args })
  return data
}

const fetchResource = (resource, { dataSource, args }) => {
  switch (resource) {
    case SEASONS:
      return dataSource.getSeasons(args)
    case GAMES:
      return dataSource.getGames(args)
    case GAME:
      return dataSource.getGame(args)
  }
}
