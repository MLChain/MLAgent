# Mlagent SDK

Official Mlagent SDK for TypeScript. Made for building bots and integrations as code.

## Installation

```bash
npm install --save @mlagent/sdk # for npm
yarn add @mlagent/sdk # for yarn
pnpm add @mlagent/sdk # for pnpm
```

## Usage

1. First, write your bot in a TypeScript file. For example, `src/index.ts`:

```ts
import { Bot, messages } from '@mlagent/sdk'

const bot = new Bot({})

bot.message('', async ({ message, client, ctx }) => {
  log.info('Received message', message)

  await client.createMessage({
    conversationId: message.conversationId,
    userId: ctx.botId,
    tags: {},
    type: 'text',
    payload: {
      text: `I'm a stub bot. You said: ${message.payload.text}`,
    },
  })
  console.log('text message sent')
})

export default bot
```

2. Then, you can run it locally:

```bash
bp serve --entry-point ./src/index.ts # using the mlagent CLI

ts-node -e "import bot from './src'; void bot.serve()" # or using ts-node directly
```

3. Or, you can bundle it and deploy it to Mlagent Cloud:

```bash
bp deploy --entry-point ./src/index.ts # using the mlagent CLI

# or, using esbuild and the Mlagent API
esbuild --bundle --target=es2019 --platform=node --format=cjs --outfile=bundle.js ./src/index.ts
code=$(cat bundle.js)
# call the Mlagent API using curl or any other HTTP client
# see https://mlagent.com/docs/api/#bot-update-bot
```
