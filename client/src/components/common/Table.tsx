import React from 'react'

interface Row {
  values: string[]
  onClick?: () => void
}
export interface TableProps {
  headers: string[]
  rows: Row[]
}
const Table: React.FC<TableProps> = ({ headers, rows }) => {
  const tableHeaders = headers.map((header, index) => <th key={index}>{header}</th>)
  const tableRows = rows.map(({ values, onClick }, index) => {
    const dataCells = values.map((value, index) => <td key={index}>{value}</td>)
    return (
      <tr className={onClick ? 'clickable' : ''} onClick={onClick} key={index}>
        {dataCells}
      </tr>
    )
  })
  return (
    <table>
      <thead data-testid="thead">
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody data-testid="tbody">{tableRows}</tbody>
    </table>
  )
}

export default Table
