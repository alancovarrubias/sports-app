import { RESTDataSource } from 'apollo-datasource-rest'
import { addMlbCacheMetadata } from './helpers'

class MlbAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://mlb:3002'
  }

  async getSeason({season_id}) {
    const season_res = await this.get(`seasons/${season_id}`)
    const season = season_res.data.attributes
    return addMlbCacheMetadata(season)
  }

  async getSeasons(_args) {
    const seasons_res = await this.get('seasons')
    const data = seasons_res.data
    const seasons = data.map(season => season.attributes)
    return seasons.map(addMlbCacheMetadata)
  }

  async getGames({ season_id, offset = 0, limit = 100 }) {
    const games_res = await this.get(`seasons/${season_id}/games`, {
      team: '1',
      line: '1',
      pred: '1',
    })
    const games = games_res.data.map(game => game.attributes)
    return games.map(addMlbCacheMetadata)
  }

  async getGame({ game_id }) {
    const game_res = await this.get(`games/${game_id}`, {
      team: '1',
      player: '1',
    })
    const game = game_res.data.attributes
    const cachedGame = {
      ...game,
      away_team: addMlbCacheMetadata(game.away_team),
      home_team: addMlbCacheMetadata(game.home_team),
      away_players: game.away_players.map(addMlbCacheMetadata),
      home_players: game.home_players.map(addMlbCacheMetadata),
    }
    return addMlbCacheMetadata(cachedGame)
  }
}

export default MlbAPI
