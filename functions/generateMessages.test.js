import fixtures from '../data/fixtures'
import generateMessages from './generateMessages'
import tenor from '../data/tenor'
import customTexts from '../data/customTexts'

describe('Skills & Damage', () => {
  const channel = 'skills'
  // test stuff
  test('Greater than 40 dmg to boss', () => {
    const key = 'dmg_high'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: fixtures[key].chat.text, channel },
      { msg: tenor.gif(key), channel },
    ])
  })

  test('Dmg between 20 and 40 to boss', () => {
    const key = 'dmg_mid'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: fixtures[key].chat.text, channel },
      { msg: tenor.gif(key), channel },
    ])
  })

  test('Less than 20 dmg to boss', () => {
    const key = 'dmg_low'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: fixtures[key].chat.text, channel },
    ])
  })

  test('Sustained more than 8 dmg', () => {
    const key = 'dmg_sustained'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: fixtures[key].chat.text, channel },
      { msg: tenor.gif(key), channel },
    ])
  })
})

describe('Quests', () => {
  const channel = 'quests'

  test('Quest start', () => {
    const key = 'quest_start'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: fixtures[key].chat.text, channel },
      { msg: tenor.gif(key), channel },
    ])
  })

  test('Quest invite', () => {
    const key = 'quest_invite'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: customTexts[key], channel },
      { msg: tenor.gif(key), channel },
    ])
  })

  test('Quest finish', () => {
    const key = 'quest_finish'
    expect(generateMessages(fixtures[key])).toEqual([
      { msg: fixtures[key].chat.text, channel },
      { msg: tenor.gif(key), channel },
    ])
  })
})

test('Non system messages', () => {
  const key = 'non_system_msg'
  expect(generateMessages(fixtures[key])).toEqual([])
})
