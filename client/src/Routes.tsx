export enum Page {
  Seasons,
  Games,
  Game,
}
type IRouteOptions = {
  season_id?: string | number
  game_id?: string | number
  search?: string
}
export const getRoute = (
  page: Page,
  { season_id, game_id, search }: IRouteOptions = {}
): string => {
  switch (page) {
    case Page.Seasons:
      return `/seasons${search}`
    case Page.Games:
      return `/seasons/${season_id}/games${search}`
    case Page.Game:
      return `/seasons/${season_id}/games/${game_id}${search}`
  }
}
