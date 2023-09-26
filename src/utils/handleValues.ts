import { IValues } from '../types/IValues'

export const handleValues = (values: IValues) => {
  const spendingTotals = values.spending.reduce((acc, curr) => {
    acc += curr.value

    return acc
  }, 0)

  const expensesTotals = values.expenses.reduce((acc, curr) => {
    acc += curr.value

    return acc
  }, 0)

  return { spendingTotals, expensesTotals }
}
