import React, { useState } from 'react'
import { Game } from '.'

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

const calculateWin = (diff: number, lineType: string) => {
    const calculateTotalWin = (game: Game) => {
        const { preds, lines, away_team, home_team } = game
        const pred = preds[0]
        const line = lines[0]
        if (!pred || !line) {
            return null
        }
        const { total, } = line
        const { away_score: awayTeamPred, home_score: homeTeamPred } = pred
        const { stat: { pts: awayTeamPts } } = away_team
        const { stat: { pts: homeTeamPts } } = home_team
        const totalActual = homeTeamPts + awayTeamPts
        const totalPred = homeTeamPred + awayTeamPred
        return countWin({ line: total, prediction: totalPred, actual: totalActual, diff })
    }

    const calculateSpreadWin = (game: Game) => {
        const { preds, lines, away_team, home_team } = game
        const pred = preds[0]
        const line = lines[0]
        if (!pred || !line) {
            return null
        }
        const { spread } = line
        const { away_score: awayTeamPred, home_score: homeTeamPred } = pred
        const { stat: { pts: awayTeamPts } } = away_team
        const { stat: { pts: homeTeamPts } } = home_team
        const spreadActual = homeTeamPts - awayTeamPts
        const spreadPred = homeTeamPred - awayTeamPred
        return countWin({ line: spread, prediction: spreadPred, actual: spreadActual, diff })
    }
    return lineType === 'spread' ? calculateSpreadWin : calculateTotalWin
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

const percentage = (wins, losses) => {
    const total = wins + losses
    if (total === 0) {
        return '0%'
    }
    const percent = wins / total
    return (100 * percent).toFixed(2) + '%'
}

interface CalculatorProps {
    games: Game[]
}
const DEFAULT_DIFF = 3
const Calculator: React.FC<CalculatorProps> = ({ games }) => {
    const [diff, setDiff] = useState(DEFAULT_DIFF)
    const calculateTotalWin = calculateWin(diff, 'total')
    const calculateSpreadWin = calculateWin(diff, 'spread')
    const totals = games.map(calculateTotalWin)
    const spreads = games.map(calculateSpreadWin)
    const { wins: totalWins, losses: totalLosses, skipped: totalSkipped } = count(totals)
    const { wins: spreadWins, losses: spreadLosses, skipped: spreadSkipped } = count(spreads)
    const headers = ['Type', 'Wins', 'Losses', 'Skipped', 'Win Percentage']
    const tableHeaders = headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))
    return (
        <>
            <h3>Bet Range</h3>
            <input type="number" style={{ marginBottom: '2rem' }} value={diff} min="0" step="0.1" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiff(Number(e.target.value))} />
            <table>
                <thead data-testid="thead">
                    <tr>{tableHeaders}</tr>
                </thead>
                <tbody data-testid="tbody">
                    <tr>
                        <td>Total</td><td>{totalWins}</td><td>{totalLosses}</td><td>{totalSkipped}</td><td>{percentage(totalWins, totalLosses)}</td>
                    </tr>
                    <tr>
                        <td>Spread</td><td>{spreadWins}</td><td>{spreadLosses}</td><td>{spreadSkipped}</td><td>{percentage(spreadWins, spreadLosses)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Calculator
