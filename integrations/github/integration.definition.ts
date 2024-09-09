import { IntegrationDefinition } from '@mlagent/sdk'
import { sentry as sentryHelpers } from '@mlagent/sdk-addons'

import { INTEGRATION_NAME } from './src/const'
import { actions, events, configuration, channels, user, states } from './src/definitions'

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  title: 'GitHub',
  version: '0.3.3',
  icon: 'icon.svg',
  readme: 'hub.md',
  description: 'Github integration for Mlagent',
  configuration,
  actions,
  events,
  channels,
  user,
  states,
  secrets: sentryHelpers.COMMON_SECRET_NAMES,
})
