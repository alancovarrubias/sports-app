import { createContext } from 'react'
import { Sport } from 'app/const'

export type ISportContext = [Sport, (sport: Sport) => void]

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default createContext<ISportContext>([Sport.MLB, () => { }])
