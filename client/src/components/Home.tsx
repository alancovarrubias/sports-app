import React from 'react'
import Table from 'app/components/common/Table'
import { useHistory } from 'react-router-dom'
import { createRoute, Page } from 'app/Routes'
import { convertToDateString } from 'app/helpers/date'

const dateRow = (date, { history }) => {
  const dateString = convertToDateString(date)
  const searchParams = new URLSearchParams()
  searchParams.append('date', dateString)
  const matchupRoute = createRoute(Page.Matchups, { searchParams })
  return { cells: [dateString], onClick: () => history.push(matchupRoute) }
}

const Home: React.FC = () => {
  const history = useHistory()
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const headers = ['Pages']
  const dates = [yesterday, today, tomorrow]
  const rows = dates.map(date => dateRow(date, { history }))
  return (
    <div className="home">
      <h2 data-testid="subheader">Home</h2>
      <Table headers={headers} rows={rows} />
    </div>
  )
}

export default Home
