<div align="center">

# Mlagent Cloud

[![Discord](https://img.shields.io/badge/Join_Community-white?color=7289da&label=Discord&labelColor=6a7ec1&logo=discord&logoColor=FFF)](https://discord.gg/mlagent)
[![YouTube Subscribe](https://img.shields.io/badge/YouTube-red?logo=youtube&logoColor=white)](https://www.youtube.com/c/mlagent)
[![Documentation](https://img.shields.io/badge/Documentation-blue?logo=typescript&logoColor=white)](https://docs.mlagent.cloud)
[![@mlagent/sdk](https://img.shields.io/badge/@mlagent%2fsdk-black?logo=npm)](https://www.npmjs.com/package/@mlagent/sdk)
[![@mlagent/cli](https://img.shields.io/badge/@mlagent%2fcli-black?logo=npm)](https://www.npmjs.com/package/@mlagent/cli)

[Mlagent](https://mlagent.com) is the ultimate platform for building **next-generation chatbots** and assistants powered by OpenAI. Start building incredible assistants for your projects or businesses at lightning speed.

[Getting started](#getting-started) •
[Cloud](https://app.mlagent.cloud) •
[Documentation](https://mlagent.com/docs) •
[Integrations](#integrations) •
[Agents](#agents)

<img src="https://user-images.githubusercontent.com/10071388/248040379-8aee1b03-c483-4040-8ee0-741554310e88.png" width="800">
  
</div>

## This Repository

This repository contains:

- [**Integrations**](#integrations) – all public integrations on the [Mlagent Hub](https://app.mlagent.cloud/hub) maintained by Mlagent
- [**Devtools**](#devtools) – all Mlagent Cloud dev tools (CLI, SDK, API Client)
- [**Bots**](#bots) - some example of bots "_as code_" made only using the SDK and the CLI
- [**Agents**](#agents) – all public agents on the [Mlagent Studio](https://studio.mlagent.cloud) **(coming soon)**

## Contributing

We love contributions from the community!

We welcome pull requests and issues relevant for any code contained in this repository. See the [This Repository](#this-repository) section for more details.

For bugs or features related to the API, Mlagent Dashboard or the Mlagent Studio, please talk to us on [Discord](https://discord.gg/mlagent) instead!

For any problem related to on-premise Mlagent v12, please see the [Mlagent v12 repository](https://github.com/mlchain/v12).

## Integrations

The [`/integrations`](./integrations) folder contains all our public and open-source integrations. We invite the community to contribute their own integrations to Mlagent Cloud.

### Integration Development

To develop an integration, start by installing the [Mlagent CLI](https://www.npmjs.com/package/@mlagent/cli):

```sh
npm install -g @mlagent/cli # for npm
yarn global add @mlagent/cli # for yarn
pnpm install -g @mlagent/cli # for pnpm
```

Then, in the directory of your choice, create a new integration:

```sh
bp init
```

This command will generate an integration from one of the proposed templates.

_This step can be executed in any directory and git repository of your choice. You don't have to fork this repository to create an integration._

You can then modify both the definition and implementation of your integration respectively located in the `integration.definition.ts` and `src/index.ts` files.

For more information on how to develop an integration, please refer to the [Documentation](https://mlagent.com/docs/getting-started-1).

### Integration Deployment

To try out your integration, you can deploy its current version to your workspace using the Mlagent CLI:

```sh
bp deploy
```

This will deploy your integration's current version to your workspace and make it available to all your bots. If this version is already deployed, it will be updated. Otherwise, a new version will be created.

By default, all integrations are private to the workspace they have been deployed in. When you are ready to share your version with the community, you can make it public by running:

```sh
bp deploy --public
```

This will make your integration available to all Mlagent users on the [Mlagent Hub](https://app.mlagent.cloud/hub). Once a version of your integration is public, it cannot be updated again.

## Bots

The [`/bots`](./bots) folder contains examples of bots "_as code_" made only using the client, the SDK and the CLI.

**This is not the recommended way to build bots** and is in no way a replacement for the Mlagent Studio.

However it can be useful for experienced developers who want to build bots in a more programmatic way.

It is also used internally by the Botress team since the Studio and CLI both use the same underlying primitives.

## Devtools

| **Package**                                                        | **Description**                                 | **Docs**                                          | **Code**               |
| ------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------- | ---------------------- |
| [`@mlagent/cli`](https://www.npmjs.com/package/@mlagent/cli)       | Build and deploy private or public integrations | [Docs](https://mlagent.com/docs/integration/cli/) | [Code](./packages/cli) |
| [`@mlagent/client`](https://www.npmjs.com/package/@mlagent/client) | Type-safe client to consume the Mlagent APIs    | [Docs]()                                          | [Code]()               |
| [`@mlagent/sdk`](https://www.npmjs.com/package/@mlagent/sdk)       | SDK used by to build integrations               | [Docs]()                                          | [Code]()               |

## Agents

Coming soon.

## Local Development

### Prerequisites

The development environment requires the following tools to be installed:

- [`git`](https://git-scm.com/): Git is a free and open source distributed version control system.
- [`node`](https://nodejs.org/en/): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [`pnpm`](https://pnpm.io/): PNPM is a fast, disk space efficient package manager.

### Building from sources

```sh
# Clone the repository
git clone https://github.com/mlchain/mlagent.git
cd mlagent

# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run Checks
pnpm run check
```

## Licensing

All packages in this repository are open-source software and licensed under the [MIT License](LICENSE). By contributing in this repository, you agree to release your code under this license as well.

Let's build the future of chatbot development together! 🤖🚀
