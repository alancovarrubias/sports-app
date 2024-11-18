import React from 'react'
import _ from 'lodash'
import { DATA_ELEMENTS } from './constants'
import { convertTime } from 'app/helpers/date'

function firstStat({ gameFinished, firstHalfStat, fullGameStat }) {
    if (gameFinished) {
        return firstHalfStat
    }
    if (!firstHalfStat.id) {
        return fullGameStat
    }
    return firstHalfStat
}

const GameTable = ({ games }): JSX.Element => {
    const styledGames = games.map((game) => {
        const gameFinished = game.finished
        return {
            ...game,
            start_time: convertTime(game.start_time),
            away_first_stat: firstStat({ gameFinished, firstHalfStat: game.away_first_half_stat, fullGameStat: game.away_full_game_stat }),
            away_second_stat: gameFinished ? game.away_full_game_stat : {},
            home_first_stat: firstStat({ gameFinished, firstHalfStat: game.home_first_half_stat, fullGameStat: game.home_full_game_stat }),
            home_second_stat: gameFinished ? game.home_full_game_stat : {}
        }
    })
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>{DATA_ELEMENTS.map((elem, index) => <th key={index}>{elem.header}</th>)}</tr>
                </thead>
                <tbody>
                    {styledGames.map((game, index) => (
                        <GameRow key={game.id} game={game} index={index} />)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export const getColor = (game_clock, index) => {
    const oddEven = index % 2
    switch (true) {
        case /Halftime/.test(game_clock):
            return oddEven ? 'red' : 'palevioletred'
        case /(1st|2nd)/.test(game_clock):
            return oddEven ? 'yellow' : 'lightyellow'
        case /Second Half/.test(game_clock):
            return oddEven ? 'orangered' : 'orange'
        case /Not Started/.test(game_clock):
            return oddEven ? 'rgb(156,225,104)' : 'rgb(147,213,186)'
        case /Final/.test(game_clock):
            return oddEven ? 'dodgerblue' : 'royalblue'
    }
}
const GameRow = ({ game, index }) => {
    const style = { backgroundColor: getColor(game.game_clock, index) }
    return (
        <>
            <tr key={game.id} style={style} className="borderTop">
                {DATA_ELEMENTS.map((elem, index) => {
                    const key = elem.rowSpan ? elem.key : `away_${elem.key}`
                    return (
                        <td className={elem.className} key={index} rowSpan={elem.rowSpan}>
                            {_.get(game, key)}
                        </td>
                    )
                })}
            </tr>
            <tr style={style}>
                {DATA_ELEMENTS.filter(elem => !elem.rowSpan).map((elem, index) => {
                    const key = `home_${elem.key}`
                    return (
                        <td className={elem.className} key={index}>
                            {_.get(game, key)}
                        </td>
                    )
                })}
            </tr>
        </>
    )
}

export default GameTable