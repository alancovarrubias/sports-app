import { RESTDataSource } from 'apollo-datasource-rest'
import { buildNbaModel, getRelationship, addCacheMetadata } from './helpers'
import { NBA } from '../const'

class NbaAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://nba:3001'
  }

  async getSeasons(_args) {
    const seasons_res = await this.get('seasons')
    const data = seasons_res.data
    const seasons = data.map(season => season.attributes)
    return addCacheMetadata(seasons, { sport: NBA })
  }

  async getGames({ season_id, offset = 0, limit = 100 }) {
    const games_res = await this.get(`seasons/${season_id}/games`, {
      offset,
      limit,
    })
    const data = games_res.data
    const games = data.map(game => game.attributes)
    return addCacheMetadata(games, { sport: NBA })
  }

  async getGame({ game_id }) {
    const game_res = await this.get(`games/${game_id}`)
    const data = game_res.data
    const away_team = await getRelationship.call(this, data, 'away_team')
    const away_players = await getRelationship.call(this, data, 'away_players')
    const home_team = await getRelationship.call(this, data, 'home_team')
    const home_players = await getRelationship.call(this, data, 'home_players')
    const game = {
      ...data.attributes,
      away_team: buildNbaModel(away_team),
      home_team: buildNbaModel(home_team),
      away_players: away_players.map(buildNbaModel),
      home_players: home_players.map(buildNbaModel),
    }
    return addCacheMetadata(game, { sport: NBA })
  }
}

export default NbaAPI
