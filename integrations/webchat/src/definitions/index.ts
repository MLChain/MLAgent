import { z, IntegrationDefinitionProps } from '@mlagent/sdk'

export { actions } from './actions'
export { events } from './events'
export { channels } from './channels'

export const configuration = {
  schema: z.object({
    messagingUrl: z.string().min(1),
    clientId: z.string().uuid(),
    clientToken: z.string().min(1),
    adminKey: z.string().min(1),
  }),
} satisfies IntegrationDefinitionProps['configuration']

export const states = {
  webchatintegration: {
    type: 'integration',
    schema: z.object({
      webhookToken: z.string(),
      webhook: z.object({
        token: z.string(),
      }),
    }),
  },
  userData: {
    type: 'user',
    schema: z.object({}).passthrough(),
  },
} satisfies IntegrationDefinitionProps['states']

export const user = {
  tags: {
    id: {},
  },
} satisfies IntegrationDefinitionProps['user']
