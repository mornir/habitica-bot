import tenor from '../data/tenor'
import customTexts from '../data/customTexts'
import { Channel } from './postToDiscord'

type Message = { msg: string; channel: Channel }

export default function generateMessages(payload: any) {
  const messages: Message[] = []

  function addMsg(msg: string, channel: Channel) {
    messages.push({ msg, channel })
  }

  if (
    payload.webhookType === 'questActivity' &&
    payload.type === 'questInvited'
  ) {
    addMsg(customTexts.quest_invite, 'quests')
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

  addMsg(chat.text, 'skills')

  if (chat.info.type === 'boss_damage') {
    const dmgSustained = parseFloat(chat.info.bossDamage)
    if (dmgSustained > 5) {
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
