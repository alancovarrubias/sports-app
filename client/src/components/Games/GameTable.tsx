import React from 'react'
import _ from 'lodash'
import { DATA_ELEMENTS } from './constants'
import { convertTime, } from 'app/helpers/date'

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

const GameTable = ({ games }): JSX.Element => {
    const styledGames = games.map((game, index) => {
        const gameFinished = game.finished
        return {
            ...game,
            start_time: convertTime(game.start_time),
            kickingTeam: game.kicking_team,
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
        <div className="table-container">
            <table>
                <Header />
                <tbody>
                    {styledGames.map((game) => (
                        <GameRow key={game.id} game={game} />)
                    )}
                </tbody>
            </table>
        </div>
    )
}

const Header = () => {
    return (
        <thead>
            <tr>{DATA_ELEMENTS.map((elem, index) => <th key={index}>{elem.header}</th>)}</tr>
        </thead>
    )
}

const GameRow = ({ game }) => {
    return (
        <>
            <TopRow game={game} />
            <BottomRow game={game} />
        </>
    )
}

const TopRow = ({ game }) => {
    return (
        <tr key={game.id} style={game.style} className="borderTop">
            {DATA_ELEMENTS.map((elem, index) => {
                const key = elem.rowSpan ? elem.key : `away${elem.key}`
                return (
                    <td className={elem.className} key={index} rowSpan={elem.rowSpan}>
                        {_.get(game, key)}
                    </td>
                )
            })}
        </tr>
    )
}

const BottomRow = ({ game }) => {
    return (
        <tr style={game.style}>
            {DATA_ELEMENTS.filter(elem => !elem.rowSpan).map((elem, index) => {
                const key = `home${elem.key}`
                return (
                    <td className={elem.className} key={index}>
                        {_.get(game, key)}
                    </td>
                )
            })}
        </tr>
    )
}

export default GameTable