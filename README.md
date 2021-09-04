# 🤖 Discord Habitica Bot

> A [Cloudflare Worker](https://workers.cloudflare.com/) that makes use of the [Habitica API](https://habitica.com/apidoc/) and [Discord Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

I [blogged about it](https://dev.to/mornir/webhooks-with-serverless-function-2h5k), but since then I moved to using Wrangler, which offers much more features:

- Modules
- TypeScript
- npm packages

# How things work

The reason the worker returns messages as JSON is only for testing purposes, so that I can make assertions on the response.

Deployments to Cloudflare (dev + production) is done via GitHub Actions

## Commands

## Environments

### test

This is environment is only for E2E testing with Cypress running against localhost. It sets the ENVIRONMENT variable to "test" and prevents real API calls (to Discord or Habitica) to be made. This environment is listed as `habitica-bot-test` in `wrangler.toml`, but it is NOT deployed to Cloudflare.

Command: `yarn test-server` (with hot reloading!)
Testing (with UI): `yarn test`
Testing (without UI, faster): `yarn test:ci`

### dev (staging)

This is the default environment: when no argument is provided to the wrangler CLI, it assumes `dev`. **The corresponding branch on GitHub is named `staging`**.
Standard staging environment. Deployed to Cloudflare worker as `habitica-bot-dev`. Messages are posted to a dedicated Discord server for testing.

Command: `yarn dev` (with hot reloading!)

### production

Production worker. Messages are posted to the Habitica Discord server. **The corresponding branch on GitHub is named `master`**.

## Exception and Error Handling

The worker always returns a 200 success code, even if errors are thrown. The reason is:

> Best practice is to respond to the Habitica server as soon as you receive a request with a 200 HTTP code and a non-empty response https://habitica.fandom.com/wiki/Webhooks

However, errors thrown are sent to [Sentry.io](https://sentry.io/) before the success code is returned.

# GIFs

## Damage

### Damage dealt > 40

![That's a lot of damage](https://tenor.com/view/damage-thats-alot-of-damage-jon-tron-gif-13054497.gif)

### Damage dealt 20-40

![That's quite a bit of damage](https://tenor.com/view/hanginthere-damage-gif-19763661.gif)

### Damage sustained > 8

![I'm hit!](https://tenor.com/view/ugh-guys-im-hit-jason-david-frank-red-zeo-ranger-tommy-oliver-power-rangers-zeo-gif-19564332.gif)

## Quest

### Quest invitation

![Gandalf Looking For Adventure](https://tenor.com/view/gandalf-looking-for-adventure-gif-13515313.gif)

### Quest starting

![Adventure Hobbit](https://tenor.com/view/adventure-lotr-hobbit-lord-of-gif-5730296.gif)

![Gandalf Prepare for Battle](https://tenor.com/view/lord-of-the-rings-ian-mc-kellen-gandalf-prepare-for-battle-prepare-gif-4879285.gif)

### Quest finished

![Hobbits clapping](https://tenor.com/view/clapping-clap-applause-lotr-lord-gif-5730286.gif)
