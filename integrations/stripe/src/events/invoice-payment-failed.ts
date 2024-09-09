import { IntegrationLogger } from '@mlagent/sdk/dist/integration/logger'
import Stripe from 'stripe'
import { Client } from '.mlagent'
import { Events } from '.mlagent/implementation/events'

export const fireInvoicePaymentFailed = async ({
  stripeEvent,
  client,
  logger,
}: {
  stripeEvent: Stripe.InvoicePaymentFailedEvent
  client: Client
  logger: IntegrationLogger
}) => {
  const { user } = await client.getOrCreateUser({
    tags: {
      id:
        typeof stripeEvent.data.object.customer === 'string'
          ? stripeEvent.data.object.customer
          : stripeEvent.data.object.customer?.id,
    },
  })

  logger.forBot().debug('Triggering invoice payment failed event')

  const payload = {
    origin: 'stripe',
    userId: user.id,
    data: { type: stripeEvent.type, object: { ...stripeEvent.data.object } },
  } satisfies Events['invoicePaymentFailed']

  await client.createEvent({
    type: 'invoicePaymentFailed',
    payload,
  })
}
