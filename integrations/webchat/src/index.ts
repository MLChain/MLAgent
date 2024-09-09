import { sentry as sentryHelpers } from '@mlagent/sdk-addons'

import actions from './actions'
import channels from './channels'
import { handler } from './handler'
import { register, unregister } from './setup'
import * as bp from '.mlagent'

const integration = new bp.Integration({
  register,
  unregister,
  handler,
  actions,
  channels,
})

export default sentryHelpers.wrapIntegration(integration, {
  dsn: bp.secrets.SENTRY_DSN,
  environment: bp.secrets.SENTRY_ENVIRONMENT,
  release: bp.secrets.SENTRY_RELEASE,
})
