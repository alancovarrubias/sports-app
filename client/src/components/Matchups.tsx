import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Sport } from 'app/const'
import { GET_MATCHUPS } from 'app/apollo/queries'
import SportContext from 'app/contexts/SportContext'
import { Game } from 'app/models'

interface IMatchupsData {
    games: Game[]
}
interface IMatchupsVars {
    sport: Sport
    date: string
}
const Matchups: React.FC = () => {
    const [sport] = useContext(SportContext)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const date = params.get('date') ? params.get('date') : new Date().toLocaleDateString()
    const { error, loading, data } = useQuery<IMatchupsData, IMatchupsVars>(
        GET_MATCHUPS,
        {
            variables: { sport, date },
        }
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    if (!data) return <p>Missing Data</p>
    return (
        <div className="home">
            <h2 data-testid="subheader">{date} Matchups</h2>
        </div>
    )
}

export default Matchups
