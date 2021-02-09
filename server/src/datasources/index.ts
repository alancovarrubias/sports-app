import NbaAPI from './nbaAPI'
import MlbAPI from './mlbAPI'
import AuthAPI from './authAPI'
import { SEASONS, SEASON, GAMES, GAME, USER } from '../const'

export default () => {
  return {
    NBA: new NbaAPI(),
    MLB: new MlbAPI(),
    AUTH: new AuthAPI()
  }
}

export const fetchData = async (resource, { args, dataSources }) => {
  const { sport = 'AUTH' } = args
  const dataSource = dataSources[sport]
  const data = await fetchResource(resource, { dataSource, args })
  return data
}

const fetchResource = (resource, { dataSource, args }) => {
  switch (resource) {
    case SEASONS:
      return dataSource.getSeasons(args)
    case SEASON:
      return dataSource.getSeason(args)
    case GAMES:
      return dataSource.getGames(args)
    case GAME:
      return dataSource.getGame(args)
    case USER:
      return dataSource.getUsers(args)
  }
}


export const fetchUser = async ({ args, dataSources }) => {
  const auth = dataSources['AUTH']
  return auth.login(args)
}