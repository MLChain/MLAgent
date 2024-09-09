import { InstagramMessage, IntegrationLogger } from './types'
import { getUserProfile } from './utils'
import * as bp from '.mlagent'

export async function handleMessage(
  message: InstagramMessage,
  { client, ctx, logger }: { client: bp.Client; ctx: bp.Context; logger: IntegrationLogger }
) {
  if (message?.message?.text) {
    logger.forBot().debug('Received text message from Instagram:', message.message.text)
    const { conversation } = await client.getOrCreateConversation({
      channel: 'channel',
      tags: {
        id: message.sender.id,
        senderId: message.sender.id,
        recipientId: message.recipient.id,
      },
    })

    const { user } = await client.getOrCreateUser({
      tags: {
        id: message.sender.id,
      },
    })

    if (!user.pictureUrl || !user.name) {
      try {
        const userProfile = await getUserProfile(message.sender.id, ctx.configuration, logger)

        logger.forBot().debug('Fetched latest Instagram user profile: ', userProfile)

        const fieldsToUpdate = {
          pictureUrl: userProfile?.profilePic,
          name: userProfile?.name || userProfile?.username,
        }
        if (fieldsToUpdate.pictureUrl || fieldsToUpdate.name) {
          await client.updateUser({ ...user, ...fieldsToUpdate })
        }
      } catch (error) {
        logger.forBot().error('Error while fetching user profile from Instagram', error)
      }
    }

    await client.createMessage({
      type: 'text',
      tags: {
        id: message.message.mid,
        senderId: message.sender.id,
        recipientId: message.recipient.id,
      },
      userId: user.id,
      conversationId: conversation.id,
      payload: { text: message.message.text },
    })
  }
}
