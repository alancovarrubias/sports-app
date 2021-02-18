
export interface Season {
    id: string
    year: number
}
export interface Pred {
    id: string
    away_score: number
    home_score: number
}
export interface Line {
    spread: number
    total: number
}
export interface NbaStat {
    pts: number
}
export interface Team {
    name: string
    stat: NbaStat
}
export interface Game {
    id: string
    year: string
    date: string
    away_team: Team
    home_team: Team
    lines: [Line]
    preds: [Pred]
}
export interface NbaPlayer {
    id: string
    name: string
    stat: NbaStat
}
export interface INbaGame {
    date: string
    away_team: Team
    home_team: Team
    away_players: NbaPlayer[]
    home_players: NbaPlayer[]
}
export interface MlbPlayer {
    id: string
    name: string
    stat: MlbStat
}
export interface IMlbGame {
    date: string
    away_team: Team
    home_team: Team
    away_players: MlbPlayer[]
    home_players: MlbPlayer[]
}
interface MlbStat {
    batting: {
        pts: string
    },
    pitching: {
        pts: string
    }
}