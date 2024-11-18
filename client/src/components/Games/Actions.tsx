import React from 'react'
import { useHistory } from 'react-router-dom'
import { changeDate } from 'app/helpers/date'
import _ from 'lodash'

export default ({ date }): JSX.Element => {
    const history = useHistory()
    const onClickCreator = (num) => {
        return () => {
            const changedDate = changeDate(date, num)
            history.push(`/games?date=${changedDate}`)
        }
    }
    const onPreviousClick = onClickCreator(-1)
    const onNextClick = onClickCreator(1)
    const onRefresh = () => {
        window.location.reload();
    }
    return (
        <div className="dateselect">
            <h1>{date} Football Games</h1>
            <button className="btn btn-danger" onClick={onRefresh}>Refresh</button>
            <button className="btn btn-primary" onClick={onPreviousClick}>Previous Day</button>
            <button className="btn btn-primary" onClick={onNextClick}>Next Day</button>
        </div>
    )
}