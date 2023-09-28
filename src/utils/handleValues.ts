import { IHandleSubtractExpenses, IHandleSumValues, IHandleValues } from "../types/IValues"

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

export const handleSubtractValues = ({
  userTotal,
  value,
}: IHandleSubtractExpenses) => {
  const repValue = Number(value ?? 0)

  const total = Number(userTotal ?? 0)

  const subtractValues = total - repValue

  return subtractValues
}

export const handleSumValues = ({ bodyValue, userValue }: IHandleSumValues) => {
  const total = Number(userValue ?? 0)

  const sumValues = bodyValue + total

  return sumValues
}
