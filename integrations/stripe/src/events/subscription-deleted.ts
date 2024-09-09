import { IntegrationLogger } from '@mlagent/sdk/dist/integration/logger'
import Stripe from 'stripe'
import { Client } from '.mlagent'
import { Events } from '.mlagent/implementation/events'

export const fireSubscriptionDeleted = async ({
  stripeEvent,
  client,
  logger,
}: {
  stripeEvent: Stripe.CustomerSubscriptionDeletedEvent
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

  logger.forBot().debug('Triggering subscription deleted event')

  const payload = {
    origin: 'stripe',
    userId: user.id,
    data: { type: stripeEvent.type, object: { ...stripeEvent.data.object } },
  } satisfies Events['subscriptionDeleted']

  await client.createEvent({
    type: 'subscriptionDeleted',
    payload,
  })
}
