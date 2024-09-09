import { sentry as sentryHelpers } from '@mlagent/sdk-addons'
import actions from './actions'
import { register, unregister, handler } from './setup'
import * as bp from '.mlagent'

console.info('starting integration')

const integration = new bp.Integration({
  register,
  unregister,
  actions,
  handler,
  channels: {},
})

export default sentryHelpers.wrapIntegration(integration, {
  dsn: bp.secrets.SENTRY_DSN,
  environment: bp.secrets.SENTRY_ENVIRONMENT,
  release: bp.secrets.SENTRY_RELEASE,
})
