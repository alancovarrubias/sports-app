import React from 'react'
import get from 'lodash.get'
import { Sport, Resource } from 'app/const'
import DataConfig from 'app/const/DataConfig'
import { Pred, Game, NbaPlayer, MlbPlayer, Season } from 'app/models'
import Table from './Table'

export type DataModel = Pred | Game | Season | NbaPlayer | MlbPlayer
export interface IDataTableProps {
  resource: Resource
  sport: Sport
  data: DataModel[]
  rowClick?: (data: DataModel) => void
}
const DataTable: React.FC<IDataTableProps> = ({ resource, sport, data, rowClick }) => {
  const { headers, keys } = DataConfig[sport][resource]
  const rows = data.map(datum => ({
    onClick: () => (rowClick ? rowClick(datum) : null),
    cells: keys.map(key => get(datum, key))
  }))
  return <Table headers={headers} rows={rows} />
}

export default DataTable
