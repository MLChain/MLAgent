import { IntegrationDefinitionProps, messages } from '@mlagent/sdk'

export const channels = {
  channel: {
    messages: { ...messages.defaults },
  },
} satisfies IntegrationDefinitionProps['channels']
