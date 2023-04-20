import React, { useContext, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Sport } from 'app/const'
import { GET_FORECASTS } from 'app/apollo/queries'
import Table from 'app/components/common/Table'
import SportContext from 'app/contexts/SportContext'
import { createRoute, Page } from 'app/routes'
import { ForecastQuery, Game } from 'app/models'

const convertTime = (time) => {
    return time
}

const forecastRow = (forecast) => {
    return { values: [convertTime(forecast.datetime), forecast.conditions, forecast.temp, forecast.dew, forecast.humidity, forecast.wind, forecast.pressure] }
}

const forecastQueryRows = (forecastQueries, time) => {
    if (!time) {
        return []
    }
    const [selectedQuery] = forecastQueries.filter((query) => query.datetime == time)
    const rows = selectedQuery.forecasts.map(forecast => forecastRow(forecast))
    return rows
}
interface IMatchupsData {
    game: Game,
    forecasts: ForecastQuery[]
}
interface IMatchupsVars {
    sport: Sport
    game_id: string
}
const Matchups: React.FC = () => {
    const [sport] = useContext(SportContext)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const date = searchParams.get('date')
    const game_id = searchParams.get('game_id')
    const [time, setTime] = useState("")
    const { error, loading, data } = useQuery<IMatchupsData, IMatchupsVars>(
        GET_FORECASTS,
        {
            variables: { sport, game_id },
        }
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    if (!data) return <p>Missing Data</p>
    const { forecasts: forecastQueries, game: { away_team, home_team, datetime } } = data
    const headers = ['Local Time', 'Conditions', 'Temp', 'Dew', 'Humidity', 'Wind', 'Pressure']
    const queryTimes = forecastQueries.map(forecastQuery => forecastQuery.datetime)
    const rows = forecastQueryRows(forecastQueries, time)
    searchParams.delete('game_id')
    const matchupsRoute = createRoute(Page.Matchups, { searchParams })
    const matchupsLink = <Link to={matchupsRoute}>{date} Matchups</Link>
    return (
        <div className="home">
            {matchupsLink}
            <h2 data-testid="subheader">{away_team.name} @ {home_team.name} {datetime} Local Time</h2>
            <h3>Forecast Query Times</h3>
            <select value={time} onChange={(e) => setTime(e.target.value)}>
                {["", ...queryTimes].map((time, index) => <option key={index} value={time}>{time}</option>)}
            </select>
            <Table headers={headers} rows={rows} />
        </div>
    )
}

export default Matchups
