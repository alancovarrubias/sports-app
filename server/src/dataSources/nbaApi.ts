import fetch from "node-fetch";

const buildNbaUrl = (path) => "http://nba:3001" + path;
export const buildGamesUrl = (id) => buildNbaUrl(`/seasons/${id}/games`);

export default class NbaApi {
  fetchGames = (seasonId) => {
    const gamesUrl = buildGamesUrl(seasonId);
    return fetch(gamesUrl);
  };
}
