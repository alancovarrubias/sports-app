import { AUTH, NBA, MLB } from '../const'
import AuthAPI from './authAPI'
import NbaAPI from './nbaAPI'
import MlbAPI from './mlbAPI'

export default () => {
  return {
    [NBA]: new NbaAPI(),
    [MLB]: new MlbAPI(),
    [AUTH]: new AuthAPI()
  }
}
