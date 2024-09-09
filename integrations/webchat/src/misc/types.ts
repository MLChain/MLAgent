import * as sdk from '@mlagent/sdk'
import * as bp from '.mlagent'

export type Client = bp.Client
export type IntegrationProps = bp.IntegrationProps

export type EventDefinition = sdk.EventDefinition
export type ActionDefinition = sdk.ActionDefinition
export type ChannelDefinition = sdk.ChannelDefinition
export type IntegrationCtx = bp.Context

export type RegisterFunction = bp.IntegrationProps['register']
export type UnregisterFunction = bp.IntegrationProps['unregister']
export type CreateConversationFunction = bp.IntegrationProps['createConversation']
export type CreateUserFunction = bp.IntegrationProps['createUser']
export type Channels = bp.IntegrationProps['channels']
