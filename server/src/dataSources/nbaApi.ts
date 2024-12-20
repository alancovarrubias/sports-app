import fetch from "node-fetch";

const buildNbaUrl = (path) => "http://nba:3001" + path;
export default class NbaApi {
  fetchSeasons = () => {
    const seasonsUrl = buildNbaUrl("/seasons")
    return fetch(seasonsUrl);
  };
  fetchGames = (seasonId) => {
    const gamesUrl = buildNbaUrl(`/seasons/${seasonId}/games`)
    return fetch(gamesUrl);
  };
}
