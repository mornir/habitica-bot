import tenor from './tenor'

export default function generateMessages(payload) {
  const QUEST_INVITE_MSG =
    '**Come and join us on a new quest! ⚔️  Quest starts in about 24 hours ⏳**'

  const messages = []

  function addMsg(msg, channel) {
    messages.push({ msg, channel })
  }

  // If quest invite
  if (payload.webhookType === 'questActivity') {
    addMsg(QUEST_INVITE_MSG, 'quests')
    addMsg(tenor.gif('quest_invite'), 'quests')
    return messages
  }

  const { chat } = payload

  if (chat.uuid !== 'system') return messages

  if (chat.info.type === 'quest_start') {
    addMsg(chat.text, 'quests')
    addMsg(tenor.gif('quest_start'), 'quests')
    return messages
  }

  if (chat.info.type === 'boss_defeated') {
    addMsg(chat.text, 'quests')
    addMsg(tenor.gif('quest_finish'), 'quests')
    return messages
  }

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

  addMsg(chat.text, 'skills')

  return messages
}
