import React from 'react'

export const GAME_HEADERS = [
    'START TIME',
    'GAME CLOCK',
    'MATCHUPS',
    'KICKED',
]

export const STAT_HEADERS = [
    'SCORE',
    'TOTAL YARDS',
    'RUSHING YARDS',
    'CAR',
    'AVE CAR',
    'TYPC',
    'C/ATT',
    'AVE ATT',
    'TYPA',
    'TYPAI',
    'PLAYS',
    'YARDS/ PLAY',
    'TYPP',
    'LONGEST PASS',
    'LONGEST RUSH',
]

const STAT_COLUMNS = [
    'score',
    'total_yards',
    'rushing_yards',
    'carries',
    'ave_per_car',
    'typc',
    'c/att',
    'ave_per_att',
    'typa',
    'typai',
    'total_plays',
    'ave_per_play',
    'typp',
    'longest_pass',
    'longest_rush',
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
    const headers = [...GAME_HEADERS, ...STAT_HEADERS, ...STAT_HEADERS]
    return (
        <thead>
            <tr>
                <th colSpan={GAME_HEADERS.length}>GAME STATS</th>
                <th colSpan={STAT_HEADERS.length}>FIRST HALF</th>
                <th colSpan={STAT_HEADERS.length}>FULL GAME</th>
            </tr>
            <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
        </thead>
    )
}

const GameRow = ({ game }) => {
    const gameFinished = game.game_clock.includes('Final')
    return (
        <>
            <tr key={game.id} style={game.style} className="borderTop">
                <td rowSpan={2}>{game.start_time}</td>
                <td rowSpan={2}>{game.game_clock}</td>
                <TeamRow team={game.away_team} />
                <td rowSpan={2}>{game.kicked}</td>
                <StatsRow gameFinished={gameFinished} firstHalfStat={game.away_first_half_stat} fullGameStat={game.away_full_game_stat} />
            </tr>
            <tr style={game.style}>
                <TeamRow team={game.home_team} />
                <StatsRow gameFinished={gameFinished} firstHalfStat={game.home_first_half_stat} fullGameStat={game.home_full_game_stat} />
            </tr>
        </>
    )
}

const StatsRow = ({ gameFinished, firstHalfStat, fullGameStat }) => {
    const firstStat = gameFinished ? firstHalfStat : firstHalfStat || fullGameStat
    const secondStat = gameFinished ? fullGameStat : null
    return (
        <>
            <StatRow stat={firstStat} />
            <StatRow stat={secondStat} />
        </>
    )
}

const TeamRow = ({ team }) => {
    if (!team) {
        return <td />
    }
    return <td>{team.name}</td>
}

const BORDERED_COLUMNS = ['c/att', 'carries', 'longest_pass', 'total_plays', 'score']

const getClassName = (column) => {
    if (BORDERED_COLUMNS.includes(column)) {
        return 'bordered'
    } else {
        return null
    }
}

const StatRow = ({ stat }) => {
    if (!stat) {
        stat = {}
    }
    return (
        <>
            {STAT_COLUMNS.map(column => {
                const text = column == 'c/att' && stat['attempts'] ? `${stat['completions']}/${stat['attempts']}` : stat[column]
                return <td className={getClassName(column)} key={column}>{text}</td>
            })}
        </>
    )
}

export default GameTable