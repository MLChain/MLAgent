import actions from './actions'
import { register, unregister, handler } from './setup'
import * as bp from '.mlagent'

export default new bp.Integration({
  register,
  unregister,
  actions,
  handler,
  channels: {},
})
