import { z, IntegrationDefinition, messages } from '@mlagent/sdk'
import { sentry as sentryHelpers } from '@mlagent/sdk-addons'

export default new IntegrationDefinition({
  name: 'twilio',
  version: '0.4.3',
  title: 'Twilio',
  description: 'This integration allows your bot to interact with Twilio.',
  icon: 'icon.svg',
  readme: 'hub.md',
  configuration: {
    schema: z.object({
      accountSID: z.string().min(1),
      authToken: z.string().min(1),
    }),
  },
  channels: {
    channel: {
      messages: messages.defaults,
      message: {
        tags: {
          id: {},
        },
      },
      conversation: {
        tags: {
          userPhone: {},
          activePhone: {},
        },
        creation: { enabled: true, requiredTags: ['userPhone', 'activePhone'] },
      },
    },
  },
  actions: {},
  events: {},
  secrets: sentryHelpers.COMMON_SECRET_NAMES,
  user: {
    tags: {
      userPhone: {},
    },
    creation: { enabled: true, requiredTags: ['userPhone'] },
  },
})
