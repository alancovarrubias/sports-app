import React from 'react'
import get from 'lodash.get'
import { Sport, Resource } from '../../const'
import DataTableConfig from './config'
import { Pred, Game, NbaPlayer, MlbPlayer, Season } from '../../models'
import Table from './Table'

export type DataModel = Pred | Game | Season | NbaPlayer | MlbPlayer
export interface IDataTableProps {
  resource: Resource
  sport: Sport
  data: DataModel[]
  rowClick?: (e: DataModel) => void
}
const DataTable: React.FC<IDataTableProps> = ({ resource, sport, data, rowClick }) => {
  const { headers, keys } = new DataTableConfig(sport, resource)
  const rows = data.map(datum => ({
    onClick: () => (rowClick ? rowClick(datum) : null),
    values: keys.map(key => get(datum, key))
  }))
  return <Table headers={headers} rows={rows} />
}

export default DataTable
