import React, { ReactText } from 'react'
import 'app/components/scss/Table.scss'
import TableRow, { Row } from './TableRow'

export { RowBuilder } from './TableRow'
export type { Row } from './TableRow'

export interface TableProps {
  headers: ReactText[]
  rows: Row[]
}
const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table>
      <thead data-testid="thead">
        <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
      </thead>
      <tbody data-testid="tbody">{rows.map((row, index) => <TableRow key={index} {...row} />)}</tbody>
    </table>
  )
}

export default Table
