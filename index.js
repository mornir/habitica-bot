import generateMessages from './generateMessages'

function postToDiscord({ msg = '', channel = 'skills' }) {
  const channels = {
    skills: DISCORD_WEBHOOK_URL,
    quests: DISCORD_QUESTS,
  }
  return fetch(channels[channel], {
    body: JSON.stringify({ content: msg }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleRequest(request) {
  try {
    const payload = await request.json()

    const messages = generateMessages(payload)
    console.log(messages)
    await Promise.all(messages.map((msg) => postToDiscord(msg)))
    return new Response('OK')
  } catch (error) {
    console.error(error)
    return new Response('OK')
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
