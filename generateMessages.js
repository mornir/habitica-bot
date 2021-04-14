import tenor from './data/tenor'
import customTexts from './data/customTexts'

const HABITICA_USER = 'https://habitica.com/api/v3/members/'

async function getNonParticipants() {
  const res = await fetch(
    'https://habitica.com/api/v3/groups/5f38dbe0-b949-4dbf-aa0e-fc317c9cbf8c',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-api-user': X_API_USER,
        'x-api-key': X_API_KEY,
      },
    }
  )
  const group = await res.json()
  const members = group.data.quest.members

  const nonParticipatingsMembers = Object.entries(members)
    .map(([id, isParticipating]) => ({ id, isParticipating }))
    .filter((member) => member.isParticipating === null)

  const responses = await Promise.all(
    nonParticipatingsMembers.map(({ id }) => fetch(HABITICA_USER + id))
  )
  const users = await Promise.all(responses.map((res) => res.json()))

  return users.map((user) => {
    return {
      title: user.data.profile.name,
      url: HABITICA_USER + user.data._id,
    }
  })
}

export default async function generateMessages(payload) {
  const messages = []

  function addMsg(msg, channel) {
    messages.push({ msg, channel })
  }

  // If quest invite
  if (payload.webhookType === 'questActivity') {
    addMsg(customTexts.quest_invite, 'quests')
    addMsg(tenor.gif('quest_invite'), 'quests')
    return messages
  }

  const { chat } = payload

  if (chat.uuid !== 'system') return messages

  if (chat.info.type === 'quest_start') {
    addMsg(chat.text, 'quests')
    //addMsg(tenor.gif('quest_start'), 'quests')
    const nonParticipants = await getNonParticipants()
    console.log(nonParticipants[0])
    addMsg(
      customTexts.quest_non_participants,
      'quest_non_participants',
      nonParticipants
    )
    return messages
  }

  if (chat.info.type === 'boss_defeated') {
    addMsg(chat.text, 'quests')
    addMsg(tenor.gif('quest_finish'), 'quests')
    return messages
  }

  addMsg(chat.text, 'skills')

  if (chat.info.type === 'boss_damage') {
    const dmgSustained = parseFloat(chat.info.bossDamage)
    if (dmgSustained > 8) {
      addMsg(tenor.gif('dmg_sustained'), 'skills')
      return messages
    }

    const dmgDealt = parseFloat(chat.info.userDamage)
    if (dmgDealt > 40) {
      addMsg(tenor.gif('dmg_high'), 'skills')
    }

    if (dmgDealt < 40 && dmgDealt > 20) {
      addMsg(tenor.gif('dmg_mid'), 'skills')
    }
  }

  return messages
}
