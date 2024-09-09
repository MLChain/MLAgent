import { sentry as sentryHelpers } from '@mlagent/sdk-addons'
import actions from './actions'
import { register, unregister, channels, handler } from './setup'
import * as bp from '.mlagent'

const integration = new bp.Integration({
  register,
  unregister,
  actions,
  channels,
  handler,
})

export default sentryHelpers.wrapIntegration(integration, {
  dsn: bp.secrets.SENTRY_DSN,
  environment: bp.secrets.SENTRY_ENVIRONMENT,
  release: bp.secrets.SENTRY_RELEASE,
})
