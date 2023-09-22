import fetch from "node-fetch";

const buildFootballUrl = (path) => "http://football:3003" + path;
export const buildSeasonsUrl = () => buildFootballUrl("/seasons");
export const buildGamesUrl = (date) => buildFootballUrl(`/games?date=${date}`);

export default class FootballApi {
  fetchSeasons = () => {
    const seasonsUrl = buildSeasonsUrl();
    return fetch(seasonsUrl);
  };
  fetchGames = (date) => {
    const gamesUrl = buildGamesUrl(date);
    return fetch(gamesUrl);
  };
}
