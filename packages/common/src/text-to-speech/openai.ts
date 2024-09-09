import { InvalidPayloadError } from '@mlagent/client'
import { IntegrationLogger, interfaces } from '@mlagent/sdk'
import OpenAI from 'openai'
import { TranscribeAudioInput, TranscribeAudioOutput } from './types'

export async function transcribeAudio<M extends string>(
  input: TranscribeAudioInput,
  openAIClient: OpenAI,
  logger: IntegrationLogger,
  props: {
    provider: string
    models: Record<M, interfaces.speechToText.SpeechToTextModelDetails>
    defaultModel: M
  }
): Promise<TranscribeAudioOutput> {
  const modelId = (input.model?.id ?? props.defaultModel) as M
  const model = props.models[modelId]
  if (!model) {
    throw new InvalidPayloadError(
      `Model ID "${modelId}" is not allowed by this integration, supported model IDs are: ${Object.keys(
        props.models
      ).join(', ')}`
    )
  }

  const file = await fetch(input.fileUrl)

  let response: OpenAI.Audio.Transcriptions.Transcription

  try {
    response = await openAIClient.audio.transcriptions.create({
      file,
      model: modelId,
      language: input.language,
      prompt: input.prompt,
      temperature: input.temperature,
      response_format: 'verbose_json', // This is needed primarily to get the duration of the audio to calculate the cost of the transcription to bill it as AI Spend to the bot, and secondarily to provide a breakdown of the transcription rather than just a single piece of text for the whole audio.
    })
  } catch (err: any) {
    if (err instanceof OpenAI.APIError) {
      logger.forBot().error(`${props.provider} error: ${err.message}`)
      throw err
    }

    // Fallback
    logger.forBot().error(err.message)
    throw err
  }

  // Note: OpenAI client doesn't have typings for the verbose JSON response format
  const result = interfaces.schemas.speechToText.OpenAITranscribeAudioOutputSchema.passthrough().safeParse(response)
  if (!result.success) {
    const message = `Failed to parse speech-to-text response from ${props.provider}: ${result.error.message}`
    logger.forBot().error(message)
    throw new Error(message)
  }

  // Note: duration is in seconds
  const cost = (result.data.duration / 60) * model.costPerMinute

  return {
    model: modelId,
    language: result.data.language,
    duration: result.data.duration,
    segments: result.data.segments,
    cost, // DEPRECATED
    mlagent: { cost },
  }
}
