import fetch from "node-fetch";

const buildFootballUrl = (path) => "http://football:3003" + path;
export const buildSeasonsUrl = () => buildFootballUrl("/seasons");
export const buildGamesUrl = (id) => buildFootballUrl(`/seasons/${id}/games`);

export default class FootballApi {
  fetchSeasons = () => {
    const seasonsUrl = buildSeasonsUrl();
    return fetch(seasonsUrl);
  };
  fetchGames = (seasonId) => {
    const gamesUrl = buildGamesUrl(seasonId);
    return fetch(gamesUrl);
  };
}
