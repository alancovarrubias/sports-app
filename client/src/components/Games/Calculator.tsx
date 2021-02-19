import React, { useState } from 'react'
import { Game } from '../../models'
import Table from '../common/Table'

enum Outcome {
    Win = 1,
    Skip = 0,
    Loss = -1,
}
enum LineType {
    Total = 'total',
    Spread = 'spread'
}
interface Bet {
    lineValue: number,
    actual: number,
    prediction: number
}
const calculateOutcomesFactory = (diff: number) => {
    return (bet: Bet): Outcome => {
        const { lineValue, prediction, actual } = bet
        if (Math.abs(lineValue - prediction) > diff) {
            const win = prediction < lineValue ? actual < lineValue : actual > lineValue
            return win ? Outcome.Win : Outcome.Loss
        } else {
            return Outcome.Skip
        }
    }
}
const calculateBetsFactory = (lineType: LineType) => {
    const calculateActualMap = {
        [LineType.Total]: (home, away) => home + away,
        [LineType.Spread]: (home, away) => home - away
    }
    return (game: Game): Bet | null => {
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
const countOutcomes = (stream: Outcome[]) => {
    const wins = stream.filter(outcome => outcome === Outcome.Win).length
    const losses = stream.filter(outcome => outcome === Outcome.Loss).length
    const skipped = stream.filter(outcome => outcome === Outcome.Skip).length
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
    const calculateTotalBets = calculateBetsFactory(LineType.Total)
    const calculateSpreadBets = calculateBetsFactory(LineType.Spread)
    const calculateOutcomes = calculateOutcomesFactory(diff)
    const totalBetData = games.map(calculateTotalBets).filter((val) => { return val !== undefined; })
    const spreadBetData = games.map(calculateSpreadBets).filter((val) => { return val !== undefined; })
    const totalOutcomes = totalBetData.map(calculateOutcomes)
    const spreadStream = spreadBetData.map(calculateOutcomes)
    const { wins: totalWins, losses: totalLosses, skipped: totalSkipped } = countOutcomes(totalOutcomes)
    const { wins: spreadWins, losses: spreadLosses, skipped: spreadSkipped } = countOutcomes(spreadStream)
    const headers = ['Type', 'Wins', 'Losses', 'Skipped', 'Win Percentage']
    const totalValues = ['Total', totalWins, totalLosses, totalSkipped, percentage(totalWins, totalLosses)]
    const spreadValues = ['Total', spreadWins, spreadLosses, spreadSkipped, percentage(spreadWins, spreadLosses)]
    const rows = [{ values: totalValues }, { values: spreadValues }]
    return (
        <div className="bet-calculator">
            <h3>Bet Range</h3>
            <input type="number" style={{ marginBottom: '2rem' }} value={diff} min="0" step="0.1" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiff(Number(e.target.value))} />
            <Table rows={rows} headers={headers} />
        </div>
    )
}
export default Calculator