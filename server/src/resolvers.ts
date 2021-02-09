import { USER, SEASONS, SEASON, GAMES, GAME, NBA_STAT, MLB_STAT } from './const'
import { fetchUser, fetchData } from './datasources'

export default {
  Stat: {
    __resolveType(obj) {
      if (obj.pts >= 0) {
        return NBA_STAT
      }
      if (obj.pitching || obj.batting) {
        return MLB_STAT
      }
      return null
    },
  },
  Query: {
    users: (_source, args, { dataSources }) => fetchData(USER, { args, dataSources }),
    season: (_source, args, { dataSources }) => fetchData(SEASON, { args, dataSources }),
    seasons: (_source, args, { dataSources }) => fetchData(SEASONS, { args, dataSources }),
    games: (_source, args, { dataSources }) => fetchData(GAMES, { args, dataSources }),
    game: (_source, args, { dataSources }) => fetchData(GAME, { args, dataSources }),
  },
  Mutation: {
    login: (_source, args, { dataSources }) => fetchUser({ args, dataSources }),
  }
}
