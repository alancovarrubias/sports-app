import React from 'react'
import get from 'lodash.get'
import { Sport, Resource } from '../../const'
import DataTableConfig from './config'
import { Pred, Game } from '../Games'
import { NbaPlayer } from '../Game/NbaGame'
import { MlbPlayer } from '../Game/MlbGame'
import { Season } from '../Seasons'

export type DataModel = Pred | Game | Season | NbaPlayer | MlbPlayer
export interface IDataTableProps {
  resource: Resource
  sport: Sport
  data: DataModel[]
  rowClick?: (e: DataModel) => void
}
const DataTable: React.FC<IDataTableProps> = ({ resource, sport, data, rowClick }) => {
  const tableConfig = new DataTableConfig(sport, resource)
  const tableHeaders = tableConfig.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const tableRows = data.map(model => (
    <tr key={model.id} onClick={() => (rowClick ? rowClick(model) : null)}>
      {tableConfig.keys.map((key, index) => (
        <td key={index}>{get(model, key)}</td>
      ))}
    </tr>
  ))
  return (
    <table>
      <thead data-testid="thead">
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody data-testid="tbody">{tableRows}</tbody>
    </table>
  )
}

export default DataTable
