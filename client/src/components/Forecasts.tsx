import React, { useContext } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Sport } from 'app/const'
import { GET_FORECASTS } from 'app/apollo/queries'
import Table from 'app/components/common/Table'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page } from 'app/Routes'
import { Forecast, Game } from 'app/models'

const forecastRow = (forecast, { history, searchParams }) => {
    return { values: [forecast.time, forecast.conditions, forecast.temp, forecast.dew, forecast.humidity, forecast.wind, forecast.pressure] }
}

interface IMatchupsData {
    game: Game,
    forecasts: Forecast[]
}
interface IMatchupsVars {
    sport: Sport
    game_id: string
}
const Matchups: React.FC = () => {
    const history = useHistory()
    const [sport] = useContext(SportContext)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const date = searchParams.get('date')
    const game_id = searchParams.get('game_id')
    const { error, loading, data } = useQuery<IMatchupsData, IMatchupsVars>(
        GET_FORECASTS,
        {
            variables: { sport, game_id },
        }
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    if (!data) return <p>Missing Data</p>
    const { forecasts, game: { away_team, home_team } } = data
    const headers = ['Time', 'Conditions', 'Temp', 'Dew', 'Humidity', 'Wind', 'Pressure']
    const rows = forecasts.map(forecast => forecastRow(forecast, { history, searchParams }))
    searchParams.delete('game_id')
    const matchupsRoute = createRoute(Page.Matchups, { searchParams })
    const matchupsLink = <Link to={matchupsRoute}>{date} Matchups</Link>
    return (
        <div className="home">
            {matchupsLink}
            <h2 data-testid="subheader">{away_team.name} @ {home_team.name} {date} Forecasts</h2>
            <Table headers={headers} rows={rows} />
        </div>
    )
}

export default Matchups
