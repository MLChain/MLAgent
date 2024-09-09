import { api as publicOpenapi } from '@mlagent/api'

void publicOpenapi.exportClient('./src/gen', {
  generator: 'opapi',
})
