import { transformTicket } from 'src/definitions/schemas'
import { getZendeskClient } from '../client'
import * as bp from '.mlagent'

export const getTicket: bp.IntegrationProps['actions']['getTicket'] = async ({ ctx, input }) => {
  const ticket = await getZendeskClient(ctx.configuration).getTicket(input.ticketId)
  return { ticket: transformTicket(ticket) }
}
