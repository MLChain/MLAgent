import { IntegrationDefinition } from '@mlagent/sdk'

import { INTEGRATION_NAME } from './src/const'
import { configuration, actions } from './src/definitions'

export default new IntegrationDefinition({
  name: INTEGRATION_NAME,
  version: '0.3.3',
  description: 'Seamlessly connect your Mlagent chatbot with Google Sheets for easy data writing and retrieval',
  title: 'Google Sheets',
  readme: 'hub.md',
  icon: 'icon.svg',
  configuration,
  actions,
})
