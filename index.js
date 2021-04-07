const QUEST_INVITE_MSG =
  '**Come and join us on a new quest! ⚔️  Quest starts in about 24 hours ⏳**'

const TENOR_URL = 'https://tenor.com/view/'

const GIFS = {
  dmg: {
    high: ['damage-thats-alot-of-damage-jon-tron-gif-13054497'],
    mid: ['hanginthere-damage-gif-19763661'],
    sustained: [
      'ugh-guys-im-hit-jason-david-frank-red-zeo-ranger-tommy-oliver-power-rangers-zeo-gif-19564332',
    ],
  },
  quest: {
    invite: ['gandalf-looking-for-adventure-gif-13515313'],
    start: [
      'adventure-lotr-hobbit-lord-of-gif-5730296',
      'lord-of-the-rings-ian-mc-kellen-gandalf-prepare-for-battle-prepare-gif-4879285',
    ],
    finish: ['clapping-clap-applause-lotr-lord-gif-5730286'],
  },
}

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

    // If quest invite
    if (payload.webhookType === 'questActivity') {
      await postToDiscord(QUEST_INVITE_MSG, 'quests')
      await postToDiscord(TENOR_URL + GIFS.quest.invite[0], 'quests')
      return new Response('OK')
    }

    const { chat } = payload

    if (chat.uuid !== 'system') return new Response('OK')

    if (chat.info.type === 'quest_start') {
      await postToDiscord(chat.text, 'quests')
      await postToDiscord(TENOR_URL + GIFS.quest.start[0], 'quests')
      return new Response('OK')
    }

    if (chat.info.type === 'boss_defeated') {
      await postToDiscord(chat.text, 'quests')
      await postToDiscord(TENOR_URL + GIFS.dmg.high[0], 'quests')
      return new Response('OK')
    }

    await postToDiscord(chat.text, 'skills')

    if (chat.info.type === 'boss_damage') {
      const dmgSustained = parseFloat(chat.info.bossDamage)
      if (dmgSustained > 8) {
        await postToDiscord(TENOR_URL + GIFS.dmg.sustained[0], 'skills')
        return new Response('OK')
      }

      const dmgDealt = parseFloat(chat.info.userDamage)
      if (dmgDealt > 40) {
        await postToDiscord(TENOR_URL + GIFS.dmg.high[0], 'skills')
      }

      if (dmgDealt < 40 && dmgDealt > 20) {
        await postToDiscord(TENOR_URL + GIFS.dmg.mid[0], 'skills')
      }

      if (dmgSustained > 8) {
        await postToDiscord(TENOR_URL + GIFS.dmg.sustained[0], 'skills')
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
