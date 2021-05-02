type Channel = 'skills' | 'quests' | 'quest_non_participants' | 'supervision'

export default function postToDiscord({
  msg = '',
  channel = 'skills',
  embeds = [],
}: {
  msg: string
  channel: Channel
  embeds?: Embed[]
}): Promise<Response> {
  const channels = {
    skills: DISCORD_WEBHOOK_URL,
    quests: DISCORD_QUESTS,
    quest_non_participants: DISCORD_QUEST_NON_PARTICIPANTS,
    supervision: DISCORD_SUPERVISION,
  }
  return fetch(channels[channel], {
    body: JSON.stringify({ content: msg, embeds }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
}

export { Channel }
