import { getOrder, getColor } from 'app/components/Games/helpers'

test('getOrder', async () => {
  expect(getOrder('Halftime')).toEqual(-1)
  expect(getOrder('End of 2nd')).toEqual(0)
  expect(getOrder('7:30 - 2nd')).toEqual(0.5)
  expect(getOrder('15:00 - 2nd')).toEqual(1)
  expect(getOrder('End of 1st')).toEqual(2)
  expect(getOrder('3:45 - 1st')).toEqual(2.25)
  expect(getOrder('7:30 - 1st')).toEqual(2.5)
  expect(getOrder('11:15 - 1st')).toEqual(2.75)
  expect(getOrder('15:00 - 1st')).toEqual(3)
  expect(getOrder('Second Half')).toEqual(4)
  expect(getOrder('15:00 - 3rd')).toEqual(4)
  expect(getOrder('Not Started')).toEqual(5)
  expect(getOrder('Final')).toEqual(6)
  expect(getOrder('Final/OT')).toEqual(6)
})

test('getOrder', async () => {
  expect(getColor('Halftime', 0)).toEqual('palevioletred')
  expect(getColor('Halftime', 1)).toEqual('red')
  expect(getColor('2nd', 0)).toEqual('lightyellow')
  expect(getColor('2nd', 1)).toEqual('yellow')
  expect(getColor('1st', 0)).toEqual('lightyellow')
  expect(getColor('1st', 1)).toEqual('yellow')
  expect(getColor('Second Half', 0)).toEqual('orange')
  expect(getColor('Second Half', 1)).toEqual('orangered')
  expect(getColor('Not Started', 0)).toEqual('rgb(147,213,186)')
  expect(getColor('Not Started', 1)).toEqual('rgb(156,225,104)')
  expect(getColor('Final', 0)).toEqual('royalblue')
  expect(getColor('Final', 1)).toEqual('dodgerblue')
})