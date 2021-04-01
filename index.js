const QUEST_INVITE_MSG =
  '`Come and join us on a new quest! ⚔️  Quest starts in about 24 hours ⏳`'

function postToDiscord(msg = '', channel = 'skills') {
  const channels = {
    skills: DISCORD_WEBHOOK_URL,
    quests: DISCORD_QUESTS
  }
  return fetch(channels[channel], {
    body: JSON.stringify({ content: msg }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
}

async function handleRequest(request) {
  try {
    const payload = await request.json()

    if (
      payload.webhookType === 'questActivity' &&
      payload.type === 'questInvited'
    ) {
      await postToDiscord(QUEST_INVITE_MSG, 'quests')
      return new Response('OK')
    }

    const { chat } = payload

    if (chat.uuid === 'system') {
      if (
        chat.info.type === 'quest_start' ||
        chat.info.type === 'boss_defeated'
      ) {
        await postToDiscord(chat.text, 'quests')
      } else {
        await postToDiscord(chat.text, 'skills')
      }

      if (
        chat.info.type === 'boss_damage' &&
        parseInt(chat.info.userDamage) > 40
      ) {
        await postToDiscord(
          'https://tenor.com/view/damage-thats-alot-of-damage-jon-tron-gif-13054497',
          'skills'
        )
      }
    }

    return new Response('OK')
  } catch (error) {
    console.error(error)
    return new Response('OK')
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
