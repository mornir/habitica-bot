import fixtures from './fixtures'
import generateMessages from './generateMessages'
import tenor from './tenor'

test('High dmg to boss', () => {
  const key = 'dmg_high'
  expect(generateMessages(fixtures[key])).toEqual([
    { msg: fixtures[key].chat.text, channel: 'skills' },
    { msg: tenor.gif(key), channel: 'skills' },
  ])
})

test('Medium dmg to boss', () => {
  const key = 'dmg_mid'
  expect(generateMessages(fixtures[key])).toEqual([
    { msg: fixtures[key].chat.text, channel: 'skills' },
    { msg: tenor.gif(key), channel: 'skills' },
  ])
})
