import os from 'os'
import pathlib from 'path'
import { CLI_ROOT_DIR } from './root'

// configurable

export const defaultMlagentHome = pathlib.join(os.homedir(), '.mlagent')

export const defaultOutputFolder = '.mlagent'
export const defaultEntrypoint = pathlib.join('src', 'index.ts')
export const defaultMlagentApiUrl = 'https://api.mlagent.cloud'
export const defaultMlagentAppUrl = 'https://app.mlagent.cloud'
export const defaultTunnelUrl = 'https://tunnel.mlagent.cloud'

// not configurable

export const cliRootDir = CLI_ROOT_DIR

export const echoBotDirName = 'echo-bot'
export const emptyIntegrationDirName = 'empty-integration'
export const helloWorldIntegrationDirName = 'hello-world'
export const webhookMessageIntegrationDirName = 'webhook-message'

export const fromCliRootDir = {
  echoBotTemplate: pathlib.join('templates', echoBotDirName),
  emptyIntegrationTemplate: pathlib.join('templates', emptyIntegrationDirName),
  helloWorldIntegrationTemplate: pathlib.join('templates', helloWorldIntegrationDirName),
  webhookMessageIntegrationTemplate: pathlib.join('templates', webhookMessageIntegrationDirName),
}

export const fromHomeDir = {
  globalCacheFile: 'global.cache.json',
}

export const fromWorkDir = {
  integrationDefinition: 'integration.definition.ts',
  interfaceDefinition: 'interface.definition.ts',
}

export const fromOutDir = {
  distDir: 'dist',
  outFile: pathlib.join('dist', 'index.js'),
  installDir: 'installations',
  implementationDir: 'implementation',
  secretsDir: 'secrets',
  projectCacheFile: 'project.cache.json',
}
