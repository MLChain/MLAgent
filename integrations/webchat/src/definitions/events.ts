import { z, IntegrationDefinitionProps } from '@mlagent/sdk'

import { TriggerSchema } from './schemas'

const conversationStartedSchema = z.object({
  userId: z.string().uuid(),
  conversationId: z.string().uuid(),
})

const conversationStarted = {
  schema: conversationStartedSchema,
  title: 'Conversation Started',
  description: 'This event occurs when a user activates the webchat widget, prompting the chat interface to appear.',
  ui: {},
}

export type Trigger = z.infer<typeof trigger.schema>

export const trigger = {
  title: 'Custom Trigger (advanced)',
  description:
    "This event occurs when a payload is sent from the browser. That payload will be available in {{event.payload}}. Usage: \n\nwindow.mlagentWebChat.sendPayload({ type: 'trigger', payload: {} })",
  schema: TriggerSchema,
  ui: {},
}

export const events = {
  conversationStarted,
  trigger,
} satisfies IntegrationDefinitionProps['events']
