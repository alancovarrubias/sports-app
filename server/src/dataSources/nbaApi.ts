import fetch from "node-fetch";

const buildNbaUrl = (path) => "http://nba:3000" + path;
export const GAMES_URL = buildNbaUrl("/games");

export default class NbaApi {
    fetchGames = () => {
        return fetch(GAMES_URL)
    };
}
