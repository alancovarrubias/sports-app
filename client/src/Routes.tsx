export enum Page {
  Login,
  Home,
  Seasons,
  Games,
  Game,
  Forecasts,
  Matchups,
}
type IRouteOptions = {
  game_id?: string | number
  searchParams?: URLSearchParams
}

const createPath = (route, search) => search ? `${route}?${search}` : route
export const createRoute = (
  page: Page,
  { game_id, searchParams }: IRouteOptions = {}
): string => {
  const search = searchParams ? searchParams.toString() : ''
  switch (page) {
    case Page.Home:
      return createPath('/home', search)
    case Page.Matchups:
      return createPath('/matchups', search)
    case Page.Seasons:
      return createPath('/seasons', search)
    case Page.Games:
      return createPath('/games', search)
    case Page.Game:
      return createPath(`/games/${game_id}`, search)
    case Page.Forecasts:
      return createPath(`/forecasts/${game_id}`, search)
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
  if (/^\/games$/.test(pathname)) {
    return Page.Games
  }
  if (/^\/games\/\d$/.test(pathname)) {
    return Page.Game
  }
}


export const Routes = {
  [Page.Login]: '/login',
  [Page.Home]: '/home',
  [Page.Forecasts]: '/forecasts',
  [Page.Matchups]: '/matchups',
  [Page.Seasons]: '/seasons',
  [Page.Games]: '/games',
  [Page.Game]: '/games/:game_id',
}