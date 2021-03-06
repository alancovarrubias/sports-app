import React, { useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { convertToDateString } from 'app/helpers/date'
import { Sport } from 'app/const'
import { GET_MATCHUPS } from 'app/apollo/queries'
import Table from 'app/components/common/Table'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page } from 'app/Routes'
import { Game } from 'app/models'

const matchupRow = (game, { history, searchParams }) => {
    const gameRoute = createRoute(Page.Game, { game_id: game.id, searchParams })
    return { values: [game.away_team.name, game.home_team.name, game.time], onClick: () => history.push(gameRoute) }
}

interface IMatchupsData {
    matchups: Game[]
}
interface IMatchupsVars {
    sport: Sport
    date: string
}
const Matchups: React.FC = () => {
    const history = useHistory()
    const [sport] = useContext(SportContext)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const date = searchParams.get('date') ? searchParams.get('date') : convertToDateString(new Date())
    const { error, loading, data } = useQuery<IMatchupsData, IMatchupsVars>(
        GET_MATCHUPS,
        {
            variables: { sport, date },
        }
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    if (!data) return <p>Missing Data</p>
    const { matchups } = data
    const headers = ['Away Team', 'Home Team', 'Time']
    const rows = matchups.map(date => matchupRow(date, { history, searchParams }))
    return (
        <div className="home">
            <h2 data-testid="subheader">{date} Matchups</h2>
            <Table headers={headers} rows={rows} />
        </div>
    )
}

export default Matchups
