import { z } from '@mlagent/sdk'

export const modelId = z
  .enum(['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it', 'gemma2-9b-it'])
  .describe('Model to use for content generation')
  .placeholder('mixtral-8x7b-32768')

export type ModelId = z.infer<typeof modelId>

export const speechToTextModelId = z.enum(['whisper-large-v3'])
export type SpeechToTextModelId = z.infer<typeof speechToTextModelId>
