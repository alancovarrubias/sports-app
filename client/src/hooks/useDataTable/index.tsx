import React, { FunctionComponent } from 'react'
import get from 'lodash.get'
import { Sport, Resource } from '@app/const'
import DataTableConfig from './config'

export interface DataModel {
  id: string | number
  [key: string]: string | number | object | undefined
}
export interface UseDataTableProps {
  resource: Resource
  sport: Sport
  data: DataModel[]
  rowClick?: (e: DataModel) => void
}
export interface IUseDataTable {
  (options: UseDataTableProps): [FunctionComponent]
}
const useDataTable: IUseDataTable = ({ resource, sport, data, rowClick }) => {
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
  const Table = () => (
    <table>
      <thead data-testid="thead">
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody data-testid="tbody">{tableRows}</tbody>
    </table>
  )
  return [Table]
}

export default useDataTable
