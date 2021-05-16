import React from 'react'
import Table from 'app/components/common/Table'
import { useHistory } from 'react-router-dom'
import { createRoute, Page } from 'app/Routes'

const dateRow = (date, { history }) => {
  const dateString = date.toLocaleDateString()
  const matchupSearch = `?date=${dateString}`
  const matchupRoute = createRoute(Page.Matchups, { search: matchupSearch })
  return { values: [dateString], onClick: () => history.push(matchupRoute) }
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
