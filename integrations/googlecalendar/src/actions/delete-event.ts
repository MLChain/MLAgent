import sync from './sync'
import * as bp from '.mlagent'

export const deleteEvent: bp.IntegrationProps['actions']['deleteEvent'] = async (props) => {
  const { client, ctx, input, logger } = props
  const { eventId } = input

  if (!eventId) {
    return { eventId }
  }

  await sync.eventDelete({
    type: 'eventDelete',
    client,
    ctx,
    logger,
    input: {
      id: eventId,
    },
  })
  return {
    eventId,
  }
}
