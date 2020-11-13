import { RESTDataSource } from 'apollo-datasource-rest'
import { addNbaCacheMetadata } from './helpers'
import { NBA } from '../const'
import { getArgumentValues } from 'graphql/execution/values'

class NbaAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://nba:3001'
  }

  async getSeasons(_args) {
    const seasons_res = await this.get('seasons')
    const data = seasons_res.data
    const seasons = data.map(season => season.attributes)
    return seasons.map(addNbaCacheMetadata)
  }

  async getGames({ season_id, offset = 0, limit = 100 }) {
    const games_res = await this.get(`seasons/${season_id}/games`, {
      offset,
      limit,
    })
    const games = games_res.data.map(game => game.attributes)
    return games.map(addNbaCacheMetadata)
  }

  async getGame({ game_id }) {
    const game_res = await this.get(`games/${game_id}`)
    const game = game_res.data.attributes
    const cachedGame = {
      ...game,
      away_team: addNbaCacheMetadata(game.away_team),
      home_team: addNbaCacheMetadata(game.home_team),
      away_players: game.away_players.map(addNbaCacheMetadata),
      home_players: game.home_players.map(addNbaCacheMetadata),
    }
    return addNbaCacheMetadata(cachedGame)
  }
}

export default NbaAPI
