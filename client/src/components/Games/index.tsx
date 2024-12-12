import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useSubscription } from '@apollo/client'
import { GAMES_QUERY } from 'app/apollo/queries'
import GameTable from './GameTable'
import { convertTime, getColor, getOrder, changeDate, todayDate } from './helpers'
import _ from 'lodash'
import { GAME_UPDATED_SUBSCRIPTION } from 'app/apollo/queries'

function firstStat({ gameFinished, firstHalfStat, fullGameStat }) {
  if (gameFinished) {
    return firstHalfStat
  }
  if (!firstHalfStat.id) {
    return fullGameStat
  }
  return firstHalfStat
}

function secondStat({ gameFinished, fullGameStat }) {
  if (gameFinished) {
    return fullGameStat
  }
  return {}
}

const Games = (): JSX.Element => {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get('date') || todayDate();
  const { data, loading } = useQuery(GAMES_QUERY, { variables: { date } })
  const { data: subData, loading: subLoading } = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!subscriptionData.data) return;

      const updatedGame = subscriptionData.data.gameUpdated;
      console.log('inside')
      console.log(updatedGame)

      client.cache.modify({
        fields: {
          games(existingGames = []) {
            return existingGames.map((game) =>
              game.id === updatedGame.id ? { ...game, ...updatedGame } : game
            );
          },
        },
      });
    },
  });
  if (subLoading) {
    console.log("Subscription is loading...");
  }

  if (!subLoading && subData) {
    console.log("Received subscription data:", subData);
  } else {
    console.log("No data received yet.");
  }
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
  console.log(data)
  const sortedGames = [...data.games].sort((game1, game2) => getOrder(game1.game_clock) - getOrder(game2.game_clock))
  const styledGames = sortedGames.map((game, index) => {
    const gameFinished = game.game_clock.includes('Final')
    return {
      ...game,
      start_time: convertTime(game.start_time),
      kicked: game.kicking_team?.name,
      awayTeam: game.away_team,
      homeTeam: game.home_team,
      awayFirstStat: firstStat({ gameFinished, firstHalfStat: game.away_first_half_stat, fullGameStat: game.away_full_game_stat }),
      awaySecondStat: secondStat({ gameFinished, fullGameStat: game.away_full_game_stat }),
      homeFirstStat: firstStat({ gameFinished, firstHalfStat: game.home_first_half_stat, fullGameStat: game.home_full_game_stat }),
      homeSecondStat: secondStat({ gameFinished, fullGameStat: game.home_full_game_stat }),
      style: { backgroundColor: getColor(game.game_clock, index) }
    }
  })
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