import * as notion from '../notion'
import * as bp from '.mlagent'

export const addCommentToPage: bp.IntegrationProps['actions']['addCommentToPage'] = async ({ ctx, input }) => {
  try {
    const response = await notion.addCommentToPage(ctx, input.pageId, input.commentBody)
    if (response) {
      console.info('Successfully added comment to page')
      return {}
    } else {
      return {}
    }
  } catch (error) {
    return {}
  }
}
