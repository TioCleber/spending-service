export const handleFields = (fields?: string) => {
  if (fields) {
    const fieldsParsed = fields.split(',').reduce((acc: any, curr) => {
      const camposAninhados = curr.split('.')

      if (camposAninhados.length < 2) {
        acc = {
          ...acc,
          [camposAninhados[0]]: true,
        }
      }

      if (camposAninhados.length > 1) {
        if (!acc[camposAninhados[0]]) {
          acc = {
            ...acc,
            [camposAninhados[0]]: {
              select: { [camposAninhados[1]]: true },
            },
          }
        }

        acc = {
          ...acc,
          [camposAninhados[0]]: {
            select: {
              ...(acc[camposAninhados[0]].select as any),
              [camposAninhados[1]]: true,
            },
          },
        }
      }

      return acc
    }, {})

    return fieldsParsed
  }

  return undefined
}
