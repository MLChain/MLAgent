import * as sdk from '@mlagent/sdk'
import { uploadArticlesToKb } from 'src/misc/upload-articles-to-kb'
import { deleteKbArticles } from 'src/misc/utils'
import * as bp from '.mlagent'

export const syncKb: bp.IntegrationProps['actions']['syncKb'] = async ({ ctx, input, client, logger }) => {
  try {
    const kbId = input.knowledgeBaseId

    await deleteKbArticles(kbId, client)

    await uploadArticlesToKb({ ctx, client, logger, kbId })

    return {
      success: true,
    }
  } catch (error) {
    throw new sdk.RuntimeError(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
  }
}
