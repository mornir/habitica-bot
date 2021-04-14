import generateMessages from './generateMessages'
import Toucan from 'toucan-js'

function postToDiscord({ msg = '', channel = 'skills', embeds = [] }) {
  const channels = {
    skills: DISCORD_WEBHOOK_URL,
    quests: DISCORD_QUESTS,
    quest_non_participants: DISCORD_QUEST_NON_PARTICIPANTS,
  }
  return fetch(channels[channel], {
    body: JSON.stringify({ content: msg, embeds }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleRequest(request, sentry) {
  try {
    const payload = await request.json()
    const messages = await generateMessages(payload)
    for (const message of messages) {
      await postToDiscord(message)
    }
    return new Response('OK')
  } catch (error) {
    console.error(error.message)
    // sentry.captureException(error)
    return new Response('OK')
  }
}

addEventListener('fetch', (event) => {
  const sentry = new Toucan({
    dsn:
      'https://331a5a79b60446d1b8783a056efd3390@o567143.ingest.sentry.io/5710790',
    event,
    environment: ENVIRONMENT,
    allowedHeaders: ['user-agent'],
    allowedSearchParams: /(.*)/,
  })

  event.respondWith(handleRequest(event.request, sentry))
})
