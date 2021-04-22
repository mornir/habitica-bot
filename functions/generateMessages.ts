import tenor from '../data/tenor'
import customTexts from '../data/customTexts'
import { Channel } from './postToDiscord'

type Message = { msg: string; channel: Channel }

type SkillCode = keyof typeof customTexts.skills

function generateSkillMessage(user: string, skillCode: SkillCode) {
  const skill = customTexts.skills[skillCode]
  if (!skill) {
    return 'Error: No skill found'
  }
  return skill.text.replace('@user', user).replace('@skill', skill.name)
}

export default function generateMessages(payload: any): Message[] {
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

  if (chat.info.type === 'spell_cast_party') {
    addMsg(generateSkillMessage(chat.info.user, chat.info.spell), 'skills')
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
