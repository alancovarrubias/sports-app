import React, { FunctionComponent } from 'react'
import { Game, Line } from '../components/Games'

interface CountWinProps {
    line: number
    prediction: number
    actual: number
    diff: number
}
interface ICountWin {
    (options: CountWinProps): number
}
const countWin: ICountWin = ({ line, prediction, actual, diff }) => {
    if (Math.abs(line - prediction) > diff) {
        const win = prediction < line ? actual < line : actual > line
        return win ? 1 : -1
    } else {
        return 0
    }
}

const calculateWin = (game: Game) => {
    const { preds, lines, away_team, home_team } = game
    const pred = preds[0]
    const line = lines[0]
    if (!pred) {
        return { total: null, spread: null }
    }
    const { total, spread } = line
    const { away_score: awayTeamPred, home_score: homeTeamPred } = pred
    const { stat: { pts: awayTeamPts } } = away_team
    const { stat: { pts: homeTeamPts } } = home_team
    const totalActual = homeTeamPts + awayTeamPts
    const totalPred = homeTeamPred + awayTeamPred
    const spreadActual = homeTeamPts - awayTeamPts
    const spreadPred = homeTeamPred - awayTeamPred
    const totalWin = countWin({ line: total, prediction: totalPred, actual: totalActual, diff: 3 })
    const spreadWin = countWin({ line: spread, prediction: spreadPred, actual: spreadActual, diff: 3 })
    return { total: totalWin, spread: spreadWin }
}

const count = (stream: (number | null)[]) => {
    let wins = 0
    let losses = 0
    let skipped = 0
    stream.forEach(elem => {
        if (elem === 1) {
            wins += 1
        }
        if (elem === 0) {
            skipped += 1
        }
        if (elem === -1) {
            losses += 1
        }
    })
    return { wins, losses, skipped }
}

interface UseCalculatorProps {
    games: Game[]
}
interface IUseCalculator {
    (options: UseCalculatorProps): [FunctionComponent]
}
const useCalculator: IUseCalculator = ({ games }) => {
    const wins = games.map(calculateWin)
    const totals = wins.map(({ total }) => total)
    const spreads = wins.map(({ spread }) => spread)
    const { wins: totalWins, losses: totalLosses, skipped: totalSkipped } = count(totals)
    const { wins: spreadWins, losses: spreadLosses, skipped: spreadSkipped } = count(spreads)
    const headers = ['Type', 'Wins', 'Losses', 'Skipped']
    const tableHeaders = headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))
    const Calculator = () => {
        return (<table>
            <thead data-testid="thead">
                <tr>{tableHeaders}</tr>
            </thead>
            <tbody data-testid="tbody">
                <tr>
                    <td>Total</td><td>{totalWins}</td><td>{totalLosses}</td><td>{totalSkipped}</td>
                </tr>
                <tr>
                    <td>Spread</td><td>{spreadWins}</td><td>{spreadLosses}</td><td>{spreadSkipped}</td>
                </tr>
            </tbody>
        </table>
        )
    }
    return [Calculator]
}

export default useCalculator
