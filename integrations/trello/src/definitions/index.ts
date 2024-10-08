import { z } from '@mlagent/sdk'

import { actions } from './actions'
import { channels } from './channels'

export { actions }
export { channels }

export const configuration = {
  schema: z.object({
    apiKey: z.string().min(1).describe('API Key for Trello'),
    token: z.string().min(1).describe('API Token for Trello'),
  }),
}

export const states = {}

export const user = {
  tags: {},
}
