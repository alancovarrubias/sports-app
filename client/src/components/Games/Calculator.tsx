import React, { useState } from 'react'
import { Game } from './index'

enum Outcome {
    Win = 1,
    Skip = 0,
    Loss = -1,
}
enum LineType {
    Total = 'total',
    Spread = 'spread'
}
interface BetData {
    lineValue: number,
    actual: number,
    prediction: number
}

const calculateOutcomesFactory = (diff: number) => {
    return ({ lineValue, prediction, actual }: BetData): Outcome => {
        if (Math.abs(lineValue - prediction) > diff) {
            const win = prediction < lineValue ? actual < lineValue : actual > lineValue
            return win ? Outcome.Win : Outcome.Loss
        } else {
            return Outcome.Skip
        }
    }
}

const calculateBetDataFactory = (lineType: LineType) => {
    const calculateActualMap = {
        total: (home, away) => home + away,
        spread: (home, away) => home - away
    }
    return (game: Game): BetData | null => {
        const { preds, lines } = game
        const pred = preds[0]
        const line = lines[0]
        if (pred && line) {
            const { away_team: { stat: { pts: awayTeamPts } }, home_team: { stat: { pts: homeTeamPts } } } = game
            const { away_score: awayTeamPred, home_score: homeTeamPred } = pred
            const calculateActual = calculateActualMap[lineType]
            const lineValue = line[lineType]
            const actual = calculateActual(homeTeamPts, awayTeamPts)
            const prediction = calculateActual(homeTeamPred, awayTeamPred)
            return { lineValue, actual, prediction }
        }
    }
}


const countOutcomes = (stream: (Outcome | null)[]) => {
    let wins = 0
    let losses = 0
    let skipped = 0
    stream.forEach(elem => {
        if (elem === Outcome.Win) {
            wins += 1
        }
        if (elem === Outcome.Skip) {
            skipped += 1
        }
        if (elem === Outcome.Loss) {
            losses += 1
        }
    })
    return { wins, losses, skipped }
}

const percentage = (wins, losses) => {
    const total = wins + losses
    const percent = total === 0 ? 0 : wins / total
    return `${(100 * percent).toFixed(2)}%`
}

interface CalculatorProps {
    games: Game[]
}
const DEFAULT_DIFF = 3
const Calculator: React.FC<CalculatorProps> = ({ games }) => {
    const [diff, setDiff] = useState(DEFAULT_DIFF)
    const calculateTotalBetData = calculateBetDataFactory(LineType.Total)
    const calculateSpreadBetData = calculateBetDataFactory(LineType.Spread)
    const calculateOutcomes = calculateOutcomesFactory(diff)
    const totalBetData = games.map(calculateTotalBetData).filter((val) => { return val !== undefined; })
    const spreadBetData = games.map(calculateSpreadBetData).filter((val) => { return val !== undefined; })
    const totalOutcomes = totalBetData.map(calculateOutcomes)
    const spreadStream = spreadBetData.map(calculateOutcomes)
    const { wins: totalWins, losses: totalLosses, skipped: totalSkipped } = countOutcomes(totalOutcomes)
    const { wins: spreadWins, losses: spreadLosses, skipped: spreadSkipped } = countOutcomes(spreadStream)
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
