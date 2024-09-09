import * as bp from '.mlagent'

type ValueOf<T> = T[keyof T]

export type ActionArgs = Parameters<ValueOf<bp.IntegrationProps['actions']>>[0]
