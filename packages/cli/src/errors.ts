import { isApiError, ApiError, UnknownError } from '@mlagent/client'
import axios, { AxiosError } from 'axios'
import { VError } from 'verror'
import * as consts from './consts'

type KnownApiError = Exclude<ApiError, UnknownError>
const isKnownApiError = (e: unknown): e is KnownApiError => isApiError(e) && !(e instanceof UnknownError)

export class MlagentCLIError extends VError {
  public static wrap(thrown: unknown, message: string): MlagentCLIError {
    const err = MlagentCLIError.map(thrown)
    return new MlagentCLIError(err, message ?? '')
  }

  public static map(thrown: unknown): MlagentCLIError {
    if (thrown instanceof MlagentCLIError) {
      return thrown
    }
    if (thrown instanceof UnknownError) {
      const inst = new HTTPError(500, 'An unknown error has occurred.')
      inst.debug = thrown.message
      return inst
    }
    if (isKnownApiError(thrown)) {
      return HTTPError.fromApi(thrown)
    }
    if (axios.isAxiosError(thrown)) {
      return HTTPError.fromAxios(thrown)
    }
    if (thrown instanceof Error) {
      const { message } = thrown
      return new MlagentCLIError(message)
    }
    return new MlagentCLIError(`${thrown}`)
  }

  private readonly _debug: string[]

  constructor(error: MlagentCLIError, message: string)
  constructor(message: string)
  public constructor(first: MlagentCLIError | string, second?: string) {
    if (typeof first === 'string') {
      super(first)
      this._debug = []
      return
    }
    super(first, second!)
    this._debug = [...first._debug]
  }

  public set debug(msg: string) {
    this._debug.push(msg)
  }

  public get debug(): string {
    const dbgMsgs = this._debug.filter((s) => s.length)
    if (!dbgMsgs.length) {
      return ''
    }
    return 'Error: \n' + dbgMsgs.map((s) => `  ${s}`).join('\n')
  }
}

export class ExclusiveBotFeatureError extends MlagentCLIError {
  constructor() {
    const message = 'This feature is only available for bots. This project is an integration or interface.'
    super(message)
  }
}

export class ExclusiveIntegrationFeatureError extends MlagentCLIError {
  constructor() {
    const message = 'This feature is only available for integration. This project is a bot or interface.'
    super(message)
  }
}

export class HTTPError extends MlagentCLIError {
  constructor(public readonly status: number | undefined, message: string) {
    super(message)
  }

  public static fromAxios(e: AxiosError<{ message?: string }>): HTTPError {
    const message = this._axiosMsg(e)
    return new HTTPError(e.response?.status, message)
  }

  public static fromApi(e: KnownApiError): HTTPError {
    const { message, code } = e
    return new HTTPError(code, message)
  }

  private static _axiosMsg(e: AxiosError<{ message?: string }>): string {
    let message = e.message
    if (e.response?.statusText) {
      message += `\n  ${e.response?.statusText}`
    }
    if (e.response?.status && e.request?.method && e.request?.path) {
      message += `\n  (${e.response?.status}) ${e.request.method} ${e.request.path}`
    }
    if (e.response?.data?.message) {
      message += `\n  ${e.response?.data?.message}`
    }
    return message
  }
}

export class NoBundleFoundError extends MlagentCLIError {
  constructor() {
    const message = 'No bundle found. Please run `bp bundle` first.'
    super(message)
  }
}

export class NoBotsFoundError extends MlagentCLIError {
  constructor() {
    const message = `No Bot found in your Workspace. Please create one first at ${consts.defaultMlagentAppUrl}.`
    super(message)
  }
}

export class NoWorkspacesFoundError extends MlagentCLIError {
  constructor() {
    const message = 'No Workspace found. Please create one first.'
    super(message)
  }
}

export class NotLoggedInError extends MlagentCLIError {
  constructor() {
    const message = 'Not logged in. Please run `bp login` first.'
    super(message)
  }
}

export class ParamRequiredError extends MlagentCLIError {
  constructor(param: string) {
    const message = `${param} is required.`
    super(message)
  }
}

export class InvalidIntegrationReferenceError extends MlagentCLIError {
  constructor(ref: string) {
    const message = `Invalid integration reference "${ref}".`
    super(message)
  }
}

export class InvalidInterfaceReferenceError extends MlagentCLIError {
  constructor(ref: string) {
    const message = `Invalid interface reference "${ref}".`
    super(message)
  }
}
