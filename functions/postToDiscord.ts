type Channel = 'skills' | 'quests' | 'quest_non_participants'

export default function postToDiscord({
  msg = '',
  channel = 'skills' as Channel,
  embeds = [] as Embed[],
}): Promise<Response> {
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

export { Channel }
