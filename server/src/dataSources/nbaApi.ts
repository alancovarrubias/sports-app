import fetch from "node-fetch";

const buildNbaUrl = (path) => "http://nba:3001" + path;
export const buildSeasonsUrl = () => buildNbaUrl("/seasons");
export const buildGamesUrl = (id) => buildNbaUrl(`/seasons/${id}/games`);

export default class NbaApi {
  fetchSeasons = () => {
    const seasonsUrl = buildSeasonsUrl();
    return fetch(seasonsUrl);
  };
  fetchGames = (seasonId) => {
    const gamesUrl = buildGamesUrl(seasonId);
    return fetch(gamesUrl);
  };
}
