export interface IHandleValues {
  value?: number
  userTotal?: number
  bodyValue: number
}

export const handleUpdateValues = ({
  value,
  userTotal,
  bodyValue,
}: IHandleValues) => {
  const repValue = Number(value ?? 0)

  const total = Number(userTotal ?? 0)

  const newTotalValue = total - repValue + bodyValue

  return newTotalValue
}

export interface IHandleSubtractExpenses {
  value?: number
  userTotal?: number
}

export const handleSubtractValues = ({
  userTotal,
  value,
}: IHandleSubtractExpenses) => {
  const repValue = Number(value ?? 0)

  const total = Number(userTotal ?? 0)

  const subtractValues = total - repValue

  return subtractValues
}

export interface IHandleSumValues {
  userValue?: number
  bodyValue: number
}

export const handleSumValues = ({ bodyValue, userValue }: IHandleSumValues) => {
  const total = Number(userValue ?? 0)

  const sumValues = bodyValue + total

  return sumValues
}
