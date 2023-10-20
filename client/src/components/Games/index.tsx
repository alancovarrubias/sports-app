import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GAMES_QUERY } from 'app/apollo/queries'
import GameTable from './GameTable'
import { convertTime, kickedTeam, getColor, getOrder, changeDate, todayDate } from './helpers'

const Games = (): JSX.Element => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || todayDate();
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { date } })
  const history = useHistory()
  const onClickCreator = (num) => {
    return () => {
      const changedDate = changeDate(date, num)
      history.push(`/games?date=${changedDate}`)
    }
  }
  const onPreviousClick = onClickCreator(-1)
  const onNextClick = onClickCreator(1)
  const onRefresh = () => {
    window.location.reload();
  }
  if (loading) return <p>Loading...</p>
  const sortedGames = [...data.games].sort((game1, game2) => getOrder(game1.game_clock) - getOrder(game2.game_clock))
  const styledGames = sortedGames.map((game, index) => (
    {
      ...game,
      start_time: convertTime(game.start_time),
      kicked: kickedTeam(game),
      style: { backgroundColor: getColor(game.game_clock, index) }
    }
  ))
  return (
    <>
      <div className="dateselect">
        <h1>{date} Football Games</h1>
        <button className="btn btn-danger" onClick={onRefresh}>Refresh</button>
        <button className="btn btn-primary" onClick={onPreviousClick}>Previous Day</button>
        <button className="btn btn-primary" onClick={onNextClick}>Next Day</button>
      </div>
      <GameTable games={styledGames} />
    </>
  )
}

export default Games