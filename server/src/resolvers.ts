import { AUTH, NBA_STAT, MLB_STAT } from './const'

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
    users: (_source, args, { dataSources }) => dataSources[AUTH].getUsers(args),
    matchups: (_source, { sport, ...args }, { dataSources }) => dataSources[sport].getMatchups(args),
    season: (_source, { sport, ...args }, { dataSources }) => dataSources[sport].getSeason(args),
    seasons: (_source, { sport, ...args }, { dataSources }) => dataSources[sport].getSeasons(args),
    game: (_source, { sport, ...args }, { dataSources }) => dataSources[sport].getGame(args),
    games: (_source, { sport, ...args }, { dataSources }) => dataSources[sport].getGames(args),
  },
  Mutation: {
    login: (_source, args, { dataSources }) => dataSources[AUTH].login(args)
  }
}
