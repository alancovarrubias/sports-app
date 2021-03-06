import { RESTDataSource } from 'apollo-datasource-rest'
import { addNbaCacheMetadata } from './helpers'

class NbaAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://nba:3001'
  }

  async getSeason({ season_id }) {
    const season_res = await this.get(`seasons/${season_id}`)
    const season = season_res.data.attributes
    return addNbaCacheMetadata(season)
  }

  async getSeasons(_args) {
    const seasons_res = await this.get('seasons')
    const data = seasons_res.data
    const seasons = data.map(season => season.attributes)
    return seasons.map(addNbaCacheMetadata)
  }

  async getGames({ season_id }) {
    const games_res = await this.get(`seasons/${season_id}/games`, {
      team: '1',
      line: '1',
      pred: '1',
    })
    const games = games_res.data.map(game => game.attributes)
    return games.map(addNbaCacheMetadata)
  }

  async getGame({ game_id }) {
    const game_res = await this.get(`games/${game_id}`, {
      team: '1',
      player: '1',
    })
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
