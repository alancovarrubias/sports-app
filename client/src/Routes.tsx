export enum Page {
  Matchups,
  Seasons,
  Games,
  Game,
}
type IRouteOptions = {
  season_id?: string | number
  game_id?: string | number
  search?: string
}
export const createRoute = (
  page: Page,
  { season_id, game_id, search }: IRouteOptions = {}
): string => {
  switch (page) {
    case Page.Matchups:
      return `/matchups${search}`
    case Page.Seasons:
      return `/seasons${search}`
    case Page.Games:
      return `/seasons/${season_id}/games${search}`
    case Page.Game:
      return `/seasons/${season_id}/games/${game_id}${search}`
  }
}

export const getPage = (
  pathname: string,
): Page => {
  if (/^\/matchups$/.test(pathname)) {
    return Page.Matchups
  }
  if (/^\/seasons$/.test(pathname)) {
    return Page.Seasons
  }
  if (/^\/seasons\/\d\/games$/.test(pathname)) {
    return Page.Games
  }
  if (/^\/seasons\/\d\/games\/\d$/.test(pathname)) {
    return Page.Game
  }
}
