# Mlagent Client

Official Mlagent HTTP client for TypeScript. Queries the [Mlagent API](https://mlagent.com/docs/api/).

## Installation

```bash
npm install --save @mlagent/client # for npm
yarn add @mlagent/client # for yarn
pnpm add @mlagent/client # for pnpm
```

## Usage

```ts
import { Client } from '@mlagent/client'

// 0. Type definitions for each operation's IO
type GetBotInput = ClientInputs['getBot']
type GetBotOutput = ClientOutputs['getBot']

const main = async () => {
  const token = 'your-token'
  const workspaceId = 'your-workspace-id'
  const botId = 'your-bot-id'
  const client = new Client({ token, workspaceId, botId })

  // 1. plain operations
  const { bot } = await client.getBot({ id: botId })
  console.log('### bot', bot)

  // 2. list utils with `.collect()` function
  const [latestConversation] = await client.list
    .conversations({ sortField: 'createdAt', sortDirection: 'desc', integrationName: 'telegram' })
    .collect({ limit: 1 })
  console.log('### latestConversation', latestConversation)

  // 3. list utils with async generator and `for await` syntax
  for await (const message of client.list.messages({ conversationId: latestConversation.id })) {
    console.log(`### [${message.userId}]`, message.payload)
  }
}

void main()
```
