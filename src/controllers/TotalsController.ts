import { FastifyReply, FastifyRequest } from 'fastify'
import { getTotals } from '../useCases/totals'
import { totalsQuerySchema } from '../schemas/querySchema'

class TotalsController {
  async get(req: FastifyRequest, rep: FastifyReply) {
    const { fromDate, toDate } = totalsQuerySchema.parse(req.query)

    const { totalRecurringExpenses, totalSpending } = await getTotals(
      req.id,
      fromDate,
      toDate
    )

    return rep.status(200).send({ totalSpending, totalRecurringExpenses })
  }
}

export default new TotalsController()
