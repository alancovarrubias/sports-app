import { RESTDataSource } from 'apollo-datasource-rest'
import { getRelationship, buildMlbModel, addCacheMetadata } from './helpers'
import { MLB } from '../const'
import * as _ from 'lodash'

class MlbAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://mlb:3002'
  }

  async getSeasons(_args) {
    const seasons_res = await this.get('seasons')
    const seasons = seasons_res.data.map(season => season.attributes)
    return addCacheMetadata(seasons, { sport: MLB })
  }

  async getGames({ season_id, offset = 0, limit = 100 }) {
    const games_res = await this.get(`seasons/${season_id}/games`, {
      offset,
      limit,
    })
    const games = await Promise.all(
      games_res.data.map(async game => {
        const away_team = await getRelationship.call(this, game, 'away_team')
        const home_team = await getRelationship.call(this, game, 'home_team')
        return {
          ...game.attributes,
          away_team: buildMlbModel(away_team),
          home_team: buildMlbModel(home_team),
        }
      })
    )
    return addCacheMetadata(games, { sport: MLB })
  }

  async getGame({ game_id }) {
    const game_res = await this.get(`games/${game_id}`)
    const data = game_res.data
    const away_team = await getRelationship.call(this, data, 'away_team')
    const home_team = await getRelationship.call(this, data, 'home_team')
    const away_players = await getRelationship.call(this, data, 'away_players')
    const home_players = await getRelationship.call(this, data, 'home_players')
    const game = {
      ...data.attributes,
      away_team: buildMlbModel(away_team),
      home_team: buildMlbModel(home_team),
      away_players: away_players.map(buildMlbModel),
      home_players: home_players.map(buildMlbModel),
    }
    return addCacheMetadata(game, { sport: MLB })
  }
}

export default MlbAPI
