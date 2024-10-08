import type * as client from '@mlagent/client'
import type * as sdk from '@mlagent/sdk'
import bluebird from 'bluebird'
import chalk from 'chalk'
import * as fs from 'fs'
import * as pathlib from 'path'
import * as codegen from '../code-generation'
import type commandDefinitions from '../command-definitions'
import * as consts from '../consts'
import * as errors from '../errors'
import {
  ApiIntegrationRef,
  formatIntegrationRef,
  LocalPathIntegrationRef,
  parseIntegrationRef,
} from '../integration-ref'
import * as utils from '../utils'
import { ProjectCommand } from './project-command'

type IntegrationInstallDir = codegen.IntegrationInstanceJson & {
  dirname: string
}

export type AddCommandDefinition = typeof commandDefinitions.add
export class AddCommand extends ProjectCommand<AddCommandDefinition> {
  public async run(): Promise<void> {
    const projectDef = await this.readProjectDefinitionFromFS()
    if (projectDef.type !== 'bot') {
      throw new errors.ExclusiveBotFeatureError()
    }

    const integrationRef = this.argv.integrationRef

    const parsedRef = parseIntegrationRef(integrationRef)
    if (!parsedRef) {
      throw new errors.InvalidIntegrationReferenceError(integrationRef)
    }

    const integration =
      parsedRef.type === 'path'
        ? await this._fetchLocalIntegrationOrInterface(parsedRef)
        : await this._fetchApiIntegration(parsedRef)

    const allInstances = await this._listIntegrationInstances()
    const existingInstance = allInstances.find((i) => i.name === integration.name)
    if (existingInstance) {
      this.logger.warn(`Integration with name "${integration.name}" already installed.`)
      const res = await this.prompt.confirm('Do you want to overwrite the existing instance?')
      if (!res) {
        this.logger.log('Aborted')
        return
      }

      await this._uninstallIntegration(existingInstance)
    }

    await this._generateIntegrationInstance(integration)
  }

  private _fetchLocalIntegrationOrInterface = async (
    integrationOrInterfaceRef: LocalPathIntegrationRef
  ): Promise<sdk.IntegrationDefinition> => {
    this.logger.warn(
      'Installing integration from a local path. There is no guarantee that the integration is deployed with the expected schemas.'
    )

    const workDir = integrationOrInterfaceRef.path
    const pathStore = new utils.path.PathStore<'workDir' | 'integrationDefinition' | 'interfaceDefinition'>({
      workDir,
      integrationDefinition: utils.path.absoluteFrom(workDir, consts.fromWorkDir.integrationDefinition),
      interfaceDefinition: utils.path.absoluteFrom(workDir, consts.fromWorkDir.interfaceDefinition),
    })

    const projectDef = await this.readProjectDefinitionFromFS(pathStore)
    if (projectDef.type === 'bot') {
      throw new errors.MlagentCLIError(`Integration definition not found at ${workDir}`)
    } else if (projectDef.type === 'interface') {
      throw new errors.MlagentCLIError('Installing interfaces is not supported yet')
    }

    return projectDef.definition
  }

  private _fetchApiIntegration = async (integrationRef: ApiIntegrationRef): Promise<client.Integration> => {
    const api = await this.ensureLoginAndCreateClient(this.argv)
    const integration = await api.findIntegration(integrationRef)
    if (integration) {
      return integration
    }

    const intrface = await api.findPublicInterface(integrationRef)
    if (intrface) {
      throw new errors.MlagentCLIError('Installing interfaces is not supported yet')
    }

    const formattedRef = formatIntegrationRef(integrationRef)
    throw new errors.MlagentCLIError(`Integration "${formattedRef}" not found`)
  }

  private async _listIntegrationInstances(): Promise<IntegrationInstallDir[]> {
    const installPath = this.projectPaths.abs.installDir
    if (!fs.existsSync(installPath)) {
      this.logger.debug('Install path does not exist. Skipping listing of integration instances')
      return []
    }

    const allFiles = await fs.promises.readdir(installPath)
    const allPaths = allFiles.map((name) => pathlib.join(installPath, name))
    const directories = await bluebird.filter(allPaths, async (path) => {
      const stat = await fs.promises.stat(path)
      return stat.isDirectory()
    })

    let jsons = directories.map((root) => ({ root, json: pathlib.join(root, codegen.INTEGRATION_JSON) }))
    jsons = jsons.filter(({ json: x }) => fs.existsSync(x))

    return bluebird.map(jsons, async ({ root, json }) => {
      const content: string = await fs.promises.readFile(json, 'utf-8')
      const { name, version, id } = JSON.parse(content) as codegen.IntegrationInstanceJson
      const dirname = pathlib.basename(root)
      return {
        dirname,
        id,
        name,
        version,
      }
    })
  }

  private async _uninstallIntegration(instance: IntegrationInstallDir) {
    const installDir = this.projectPaths.abs.installDir
    const instancePath = pathlib.join(installDir, instance.dirname)
    await fs.promises.rm(instancePath, { recursive: true })
    await this._generateBotIndex()
  }

  private async _generateIntegrationInstance(integration: client.Integration | sdk.IntegrationDefinition) {
    const line = this.logger.line()

    const { name, version } = integration
    line.started(`Installing ${chalk.bold(name)} v${version}...`)

    const instanceFiles = await codegen.generateIntegrationInstance(
      integration,
      this.projectPaths.rel('outDir').installDir
    )
    await this.writeGeneratedFilesToOutFolder(instanceFiles)
    await this._generateBotIndex()

    const rel = this.projectPaths.rel('workDir')
    line.success(`Installed integration available at ${chalk.grey(rel.outDir)}`)
  }

  private async _generateBotIndex() {
    const allInstances = await this._listIntegrationInstances()
    const indexFile = await codegen.generateBotIndex(this.projectPaths.rel('outDir').installDir, allInstances)
    await this.writeGeneratedFilesToOutFolder([indexFile])
  }
}
