import React from 'react'
import _ from 'lodash'
import { DATA_ELEMENTS } from './constants'

const GameTable = ({ games }): JSX.Element => {
    return (
        <div className="table-container">
            <table>
                <Header />
                <tbody>
                    {games.map((game) => (
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