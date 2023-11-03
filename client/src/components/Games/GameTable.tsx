import React from 'react'
import _ from 'lodash'

const DATA_ELEMENTS = [
    {
        header: 'START TIME',
        type: 'Game',
        key: 'start_time',
        className: 'bordered',
    },
    {
        header: 'MATCHUPS',
        type: 'Team',
        key: 'name',
    },
    {
        header: '1H SCORE',
        type: 'FirstStat',
        key: 'score',
    },
    {
        header: 'GAME CLOCK',
        type: 'Game',
        key: 'game_clock',
    },
    {
        header: '1H TOTAL YARDS',
        type: 'FirstStat',
        key: 'total_yards',
    },
    {
        header: '1H RUSHING YARDS',
        type: 'FirstStat',
        key: 'rushing_yards',
    },
    {
        header: 'KICKED',
        type: 'Game',
        key: 'kicked',
    },
    {
        header: 'CAR',
        type: 'FirstStat',
        key: 'carries',
        className: 'bordered'
    },
    {
        header: 'AVE CAR',
        type: 'FirstStat',
        key: 'ave_per_car',
    },
    {
        header: 'TYPC',
        type: 'FirstStat',
        key: 'typc',
    },
    {
        header: 'C/ATT',
        type: 'FirstStat',
        key: 'c_att',
        className: 'bordered'
    },
    {
        header: 'AVE ATT',
        type: 'FirstStat',
        key: 'ave_per_att',
    },
    {
        header: 'TYPA',
        type: 'FirstStat',
        key: 'typa',
    },
    {
        header: 'TYPAI',
        type: 'FirstStat',
        key: 'typai',
    },
    {
        header: 'TOTAL PLAYS',
        type: 'FirstStat',
        key: 'total_plays',
        className: 'bordered'
    },
    {
        header: 'YARDS/ PLAY',
        type: 'FirstStat',
        key: 'ave_per_play',
    },
    {
        header: 'TYPP',
        type: 'FirstStat',
        key: 'typp',
    },
    {
        header: 'LONGEST RUSH',
        type: 'FirstStat',
        key: 'longest_rush',
        className: 'bordered'
    },
    {
        header: 'LONGEST PASS',
        type: 'FirstStat',
        key: 'longest_pass',
    },
    {
        header: '2H SCORE',
        type: 'SecondStat',
        key: 'score',
        className: 'bordered'
    },
    {
        header: '2H TOTAL YARDS',
        type: 'SecondStat',
        key: 'total_yards',
    },
    {
        header: '2H RUSHING YARDS',
        type: 'SecondStat',
        key: 'rushing_yards',
    },
    {
        header: 'CAR',
        type: 'SecondStat',
        key: 'carries',
        className: 'bordered'
    },
    {
        header: 'AVE CAR',
        type: 'SecondStat',
        key: 'ave_per_car',
    },
    {
        header: 'TYPC',
        type: 'SecondStat',
        key: 'typc',
    },
    {
        header: 'C/ATT',
        type: 'SecondStat',
        key: 'c_att',
        className: 'bordered'
    },
    {
        header: 'AVE ATT',
        type: 'SecondStat',
        key: 'ave_per_att',
    },
    {
        header: 'TYPA',
        type: 'SecondStat',
        key: 'typa',
    },
    {
        header: 'TYPAI',
        type: 'SecondStat',
        key: 'typai',
    },
    {
        header: 'TOTAL PLAYS',
        type: 'SecondStat',
        key: 'total_plays',
        className: 'bordered'
    },
    {
        header: 'YARDS/ PLAY',
        type: 'SecondStat',
        key: 'ave_per_play',
    },
    {
        header: 'TYPP',
        type: 'SecondStat',
        key: 'typp',
    },
    {
        header: 'LONGEST RUSH',
        type: 'SecondStat',
        key: 'longest_rush',
        className: 'bordered'
    },
    {
        header: 'LONGEST PASS',
        type: 'SecondStat',
        key: 'longest_pass',
    },
]

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

const buildKey = (prefix, elem) => {
    return `${prefix}${elem.type}.${elem.key}`

}
const TopRow = ({ game }) => {
    return (
        <tr key={game.id} style={game.style} className="borderTop">
            {DATA_ELEMENTS.map((elem, index) => {
                const key = elem.type === 'Game' ? elem.key : buildKey('away', elem)
                const text = _.get(game, key)
                const rowSpan = elem.type === 'Game' ? 2 : 1
                return <td className={elem.className} key={index} rowSpan={rowSpan}>{text}</td>
            })}
        </tr>
    )
}

const BottomRow = ({ game }) => {
    return (
        <tr style={game.style}>
            {DATA_ELEMENTS.filter(elem => elem.type !== 'Game').map((elem, index) => <td className={elem.className} key={index}>{_.get(game, buildKey('home', elem))}</td>)}
        </tr>
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


export default GameTable