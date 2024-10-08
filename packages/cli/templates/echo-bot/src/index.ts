import { Bot, z } from '@mlagent/sdk'
// import * as bp from '.mlagent' /** uncomment to get generated code */

const bot = new Bot({
  integrations: {},
  configuration: {
    schema: z.object({}),
  },
  states: {},
  events: {},
  recurringEvents: {},
})

bot.message(async ({ message, client, ctx }) => {
  console.info('Received message', message)

  await client.createMessage({
    conversationId: message.conversationId,
    userId: ctx.botId,
    tags: {},
    type: 'text',
    payload: {
      text: `You said: ${message.payload.text}`,
    },
  })

  console.info('text message sent')
})

export default bot
