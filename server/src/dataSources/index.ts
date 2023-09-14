import AuthApi from "./authApi";
import NbaApi from "./nbaApi";
import FootballApi from "./footballApi";

export interface DataSources {
  authApi: AuthApi;
  nbaApi: NbaApi;
  footballApi: FootballApi;
}
const dataSources: DataSources = {
  authApi: new AuthApi(),
  nbaApi: new NbaApi(),
  footballApi: new FootballApi(),
};

export default dataSources;
