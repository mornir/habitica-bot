import tenor from './data/tenor'
import customTexts from './data/customTexts'

async function getNonParticipants() {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }

  const [rawQuest, rawParty] = await Promise.all(
    fetch('https://habitica.com/api/v3/groups/party', options),
    fetch('https://habitica.com/api/v3/groups/party/members', options)
  )

  const quest = await rawQuest.json()
  const party = await rawParty.json()
  const questMembers = Object.keys(quest.data.quest.members)
  const partyMembers = party.data

  return partyMembers
    .filter((member) => questMembers.includes(member._id))
    .map((nonParticipant) => {
      return {
        title: nonParticipant.profile.name,
        url: 'https://habitica.com/profile/' + nonParticipant._id,
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
