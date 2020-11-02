import { createContext } from 'react'
import { Sport } from '../const'

export type ISportContext = [Sport, (sport: Sport) => void]

export default createContext<ISportContext>([Sport.NBA, () => {}])
