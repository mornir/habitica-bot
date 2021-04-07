const QUEST_INVITE_MSG =
  '**Come and join us on a new quest! ⚔️  Quest starts in about 24 hours ⏳**'

import tenor from './tenor'

function postToDiscord(msg = '', channel = 'skills') {
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

    const messages = generateMessages()

    // If quest invite
    if (payload.webhookType === 'questActivity') {
      await postToDiscord(QUEST_INVITE_MSG, 'quests')
      await postToDiscord(tenor.gif('quest_invite'), 'quests')
      return new Response('OK')
    }

    const { chat } = payload

    if (chat.uuid !== 'system') return new Response('OK')

    if (chat.info.type === 'quest_start') {
      await postToDiscord(chat.text, 'quests')
      await postToDiscord(tenor.gif('quest_start'), 'quests')
      return new Response('OK')
    }

    if (chat.info.type === 'boss_defeated') {
      await postToDiscord(chat.text, 'quests')
      await postToDiscord(tenor.gif('quest_finish'), 'quests')
      return new Response('OK')
    }

    await postToDiscord(chat.text, 'skills')

    if (chat.info.type === 'boss_damage') {
      const dmgSustained = parseFloat(chat.info.bossDamage)
      if (dmgSustained > 8) {
        await postToDiscord(tenor.gif('dmg_sustained'), 'skills')
        return new Response('OK')
      }

      const dmgDealt = parseFloat(chat.info.userDamage)
      if (dmgDealt > 40) {
        await postToDiscord(tenor.gif('dmg_high'), 'skills')
      }

      if (dmgDealt < 40 && dmgDealt > 20) {
        await postToDiscord(tenor.gif('dmg_mid'), 'skills')
      }
    }

    return new Response('OK')
  } catch (error) {
    console.error(error)
    return new Response('OK')
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
