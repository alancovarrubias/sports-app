import React, { ComponentType } from 'react'
import 'app/scss/Table.scss'

type Cell = ComponentType | string | number;
type RowClick = () => void | undefined;
export interface Row {
  cells: Cell[],
  onClick?: () => void
}
export const RowBuilder = (cells: Cell[], onClick: RowClick = undefined): Row => ({
  cells,
  onClick
})
const TableRow: React.FC<Row> = ({ cells, onClick }) => {
  return (
    <tr className={onClick && 'clickable'} onClick={onClick}>
      {cells.map((cell, index) => <td key={index}>{cell}</td>)}
    </tr>
  )
}

export default TableRow
