import React from 'react'
import Table, { RowBuilder } from 'app/components/common/Table'
import { useHistory } from 'react-router-dom'
import { createRoute, Page } from 'app/routes'
import { convertToDateString } from 'app/helpers/date'

const DateRow = (date, { history }) => {
  const dateString = convertToDateString(date)
  const searchParams = new URLSearchParams()
  searchParams.append('date', dateString)
  const matchupRoute = createRoute(Page.Matchups, { searchParams })
  const cells = [dateString]
  const onClick = () => history.push(matchupRoute)
  return RowBuilder(cells, onClick)
}

const TABLE_HEADERS = ['Paths']
const Home: React.FC = () => {
  const history = useHistory()
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const dates = [yesterday, today, tomorrow]
  const rows = dates.map(date => DateRow(date, { history }))
  return (
    <div className="home">
      <h2 data-testid="subheader">Home</h2>
      <Table headers={TABLE_HEADERS} rows={rows} />
    </div>
  )
}

export default Home
