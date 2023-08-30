import AuthApi from "./authApi";
import NbaApi from "./nbaApi";

export interface DataSources {
  authApi: AuthApi;
  nbaApi: NbaApi;
}
const dataSources: DataSources = {
  authApi: new AuthApi(),
  nbaApi: new NbaApi(),
};

export default dataSources;
