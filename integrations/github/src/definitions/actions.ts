import { z, IntegrationDefinitionProps } from '@mlagent/sdk'

const Channels = ['pullRequest', 'discussion', 'issue'] as const

export type Target = {
  displayName: string
  tags: { [key: string]: string }
  channel: typeof Channels[number]
}

const findTarget = {
  input: {
    schema: z.object({
      query: z.string(),
      channel: z.enum(Channels),
    }),
  },
  output: {
    schema: z.object({
      targets: z.array(
        z.object({
          displayName: z.string(),
          tags: z.record(z.string()),
          channel: z.enum(Channels),
        })
      ),
    }),
  },
}

export const actions = {
  findTarget,
} satisfies IntegrationDefinitionProps['actions']
