import { IntegrationDefinition } from '@mlagent/sdk'
import { sentry as sentryHelpers } from '@mlagent/sdk-addons'

import { INTEGRATION_NAME } from './src/const'
import { actions, channels, events, configuration, user, states } from './src/definitions'

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  title: 'Webchat',
  version: '0.3.2',
  icon: 'icon.svg',
  description: 'Webchat integration for Mlagent',
  readme: 'hub.md',
  configuration,
  channels,
  user,
  states,
  actions,
  events,
  secrets: sentryHelpers.COMMON_SECRET_NAMES,
})
