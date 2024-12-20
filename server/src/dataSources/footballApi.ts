import fetch from "node-fetch";

const buildFootballUrl = (path) => "http://football:3003" + path;
export default class FootballApi {
  fetchSeasons = () => {
    const seasonsUrl = buildFootballUrl("/seasons");
    return fetch(seasonsUrl);
  };
  fetchGames = (date) => {
    const gamesUrl = buildFootballUrl(`/games?date=${date}`)
    return fetch(gamesUrl);
  };
}
