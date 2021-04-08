import fixtures from './fixtures'
import generateMessages from './generateMessages'
import tenor from './tenor'

test('Greater than 40 dmg to boss', () => {
  const key = 'dmg_high'
  expect(generateMessages(fixtures[key])).toEqual([
    { msg: fixtures[key].chat.text, channel: 'skills' },
    { msg: tenor.gif(key), channel: 'skills' },
  ])
})

test('Dmg between 20 and 40 to boss', () => {
  const key = 'dmg_mid'
  expect(generateMessages(fixtures[key])).toEqual([
    { msg: fixtures[key].chat.text, channel: 'skills' },
    { msg: tenor.gif(key), channel: 'skills' },
  ])
})

test('Less than 20 dmg to boss', () => {
  const key = 'dmg_low'
  expect(generateMessages(fixtures[key])).toEqual([
    { msg: fixtures[key].chat.text, channel: 'skills' },
  ])
})
