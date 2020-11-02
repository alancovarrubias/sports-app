import React from 'react'
import { render } from '@testing-library/react'
import useDataTable, { UseDataTableProps } from '../useDataTable'
import DataTableConfig from '../useDataTable/config'
import { Sport, Resource } from '@app/const'

const renderUseDataTable = (props: UseDataTableProps) => {
  const [Table] = useDataTable(props)
  return render(<Table />)
}

test('renders a header with the specified sport context', () => {
  const sport = Sport.NBA
  const resource = Resource.Season
  const data = [{ id: 1, name: { year: 2020 } }]
  const dataConfig = new DataTableConfig(sport, resource)
  const { getByTestId } = renderUseDataTable({ sport, resource, data })
  const theader = getByTestId('thead')
  const tbody = getByTestId('tbody')
  expect(theader.children[0].children.length).toEqual(dataConfig.headers.length)
  expect(tbody.children.length).toEqual(data.length)
  expect(tbody.children[0].children.length).toEqual(dataConfig.keys.length)
})
