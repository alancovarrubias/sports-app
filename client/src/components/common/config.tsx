import { Sport, Resource } from '../../const'
type IDataMap = {
  [sport in Sport]: {
    [resource in Resource]?: { headers: string[]; keys: string[] }
  }
}
const DataMap: IDataMap = {
  [Sport.NBA]: {
    [Resource.Season]: {
      headers: ['Year'],
      keys: ['year'],
    },
    [Resource.Game]: {
      headers: ['Away Team', 'Home Team', 'Away Team Pts', 'Home Team Pts', 'Total', 'Spread', 'Away Pred', 'Home Pred'],
      keys: [
        'away_team.name',
        'home_team.name',
        'away_team.stat.pts',
        'home_team.stat.pts',
        'lines[0].total',
        'lines[0].spread',
        'preds[0].away_score',
        'preds[0].home_score'
      ],
    },
    [Resource.Player]: {
      headers: [
        'Name',
        'SP',
        'FG',
        'FGA',
        'FG3',
        'FG3A',
        'PTS',
        'ORTG',
        'DRTG',
      ],
      keys: [
        'name',
        'stat.sp',
        'stat.fg',
        'stat.fga',
        'stat.fg3',
        'stat.fg3a',
        'stat.pts',
        'stat.ortg',
        'stat.drtg',
      ],
    },
  },
  [Sport.MLB]: {
    [Resource.Season]: {
      headers: ['Year'],
      keys: ['year'],
    },
    [Resource.Game]: {
      headers: ['Away Team', 'Home Team', 'Away Team Runs', 'Home Team Runs'],
      keys: [
        'away_team.name',
        'home_team.name',
        'away_team.stat.batting.r',
        'home_team.stat.batting.r',
      ],
    },
    [Resource.Pitcher]: {
      headers: ['Name', 'IP', 'H', 'R', 'ER', 'BB', 'SO', 'HR', 'ERA'],
      keys: [
        'name',
        'stat.pitching.ip',
        'stat.pitching.h',
        'stat.pitching.r',
        'stat.pitching.er',
        'stat.pitching.bb',
        'stat.pitching.so',
        'stat.pitching.hr',
        'stat.pitching.era',
      ],
    },
    [Resource.Batter]: {
      headers: [
        'Name',
        'AB',
        'R',
        'H',
        'RBI',
        'BB',
        'SO',
        'PA',
        'BA',
        'OBP',
        'SLG',
        'OPS',
      ],
      keys: [
        'name',
        'stat.batting.ab',
        'stat.batting.r',
        'stat.batting.h',
        'stat.batting.rbi',
        'stat.batting.bb',
        'stat.batting.so',
        'stat.batting.pa',
        'stat.batting.ba',
        'stat.batting.obp',
        'stat.batting.slg',
        'stat.batting.ops',
      ],
    },
  },
}

const DEFAULT_MAP = { headers: [], keys: [] }

export default class DataTableConfig {
  public headers: string[]
  public keys: string[]
  constructor(sport: Sport, resource: Resource) {
    const { headers, keys } = DataMap[sport][resource] || DEFAULT_MAP
    this.headers = headers
    this.keys = keys
  }
}
