import React from 'react'

export const GAME_HEADERS = [
    'Start Time',
    'Game Clock',
    'Matchups',
    'Kicked',
]

export const STAT_HEADERS = [
    'Score',
    'Total Yards',
    'Rushing Yards',
    'Carries',
    'Ave Per Car',
    'TYPC',
    'C/ATT',
    'Ave Per Att',
    'TYPA',
    'TYPAI',
    'Total Plays',
    'Ave Per Play',
    'TYPP',
    'Longest Pass',
    'Longest Rush',
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
        <table>
            <Header />
            <tbody>
                {games.map((game) => (
                    <GameRow key={game.id} game={game} />)
                )}
            </tbody>
        </table>
    )
}

const Header = () => {
    const headers = [...GAME_HEADERS, ...STAT_HEADERS, ...STAT_HEADERS]
    return (
        <thead>
            <tr>
                <th colSpan={GAME_HEADERS.length}>Game Stats</th>
                <th colSpan={STAT_HEADERS.length}>First Half</th>
                <th colSpan={STAT_HEADERS.length}>Full Game</th>
            </tr>
            <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
        </thead>
    )
}

const GameRow = ({ game }) => {
    return (
        <>
            <tr key={game.id} style={game.style}>
                <td rowSpan={2}>{game.start_time}</td>
                <td rowSpan={2}>{game.game_clock}</td>
                <TeamRow team={game.away_team} />
                <td rowSpan={2}>{game.kicked}</td>
                <StatsRow firstHalfStat={game.away_first_half_stat} fullGameStat={game.away_full_game_stat} />
            </tr>
            <tr style={game.style}>
                <TeamRow team={game.home_team} />
                <StatsRow firstHalfStat={game.home_first_half_stat} fullGameStat={game.home_full_game_stat} />
            </tr>
        </>
    )
}

const StatsRow = ({ firstHalfStat, fullGameStat }) => {
    return (
        <>
            <StatRow stat={firstHalfStat || fullGameStat} />
            <StatRow stat={firstHalfStat ? fullGameStat : null} />
        </>
    )
}

const TeamRow = ({ team }) => {
    if (!team) {
        return <td />
    }
    return <td>{team.name}</td>
}

const StatRow = ({ stat }) => {
    if (!stat) {
        stat = {}
    }
    return (
        <>
            {STAT_COLUMNS.map(column => {
                if (column == 'c/att') {
                    return <td>{stat['completions']}/{stat['attempts']}</td>

                }
                return <td>{stat[column]}</td>
            })}
        </>
    )
}

export default GameTable