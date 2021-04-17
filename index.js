import generateMessages from './generateMessages'
import Toucan from 'toucan-js'
import customTexts from './data/customTexts'

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

async function getNonParticipants() {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }

  // TODO: check if TypeScript would have caught that error (missing brackets)
  const [rawQuest, rawParty] = await Promise.all([
    fetch('https://habitica.com/api/v3/groups/party', options),
    fetch('https://habitica.com/api/v3/groups/party/members', options),
  ])

  const quest = await rawQuest.json()
  const party = await rawParty.json()

  const questMembers = Object.keys(quest.data.quest.members)
  const partyMembers = party.data

  return partyMembers
    .filter((member) => !questMembers.includes(member._id))
    .map((nonParticipant) => {
      return {
        title: nonParticipant.profile.name,
        url: 'https://habitica.com/profile/' + nonParticipant._id,
      }
    })
}

async function handleRequest(request, sentry) {
  try {
    const payload = await request.json()

    if (
      payload.webhookType === 'questActivity' &&
      payload.type === 'questStarted'
    ) {
      const nonParticipants = await getNonParticipants()

      await postToDiscord({
        msg: customTexts.quest_non_participants,
        channel: 'quest_non_participants',
        embeds: nonParticipants,
      })
      return new Response('OK')
    }

    const messages = await generateMessages(payload)
    for (const message of messages) {
      await postToDiscord(message)
    }
    return new Response('OK')
  } catch (error) {
    console.error(error.message)
    //sentry.captureException(error)
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
