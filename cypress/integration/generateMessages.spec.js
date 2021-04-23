import messages from '../fixtures/messages.json'
import tenor from '../../data/tenor.ts'
import customTexts from '../../data/customTexts'

function checkChannel(messagesArray, channel) {
  messagesArray.forEach((msg) => expect(msg.channel).to.equal(channel))
}

describe('Skills Channel', () => {
  const channel = 'skills'

  it('Less than 20 dmg to boss', () => {
    const key = 'dmg_low'
    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(1)
      expect(body[0].msg).to.equal(messages[key].chat.text)
      checkChannel(body, channel)
    })
  })

  it('Dmg between 20 and 40 to boss', () => {
    const key = 'dmg_mid'
    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(2)
      expect(body[0].msg).to.equal(messages[key].chat.text)
      expect(body[1].msg).to.equal(tenor.gif(key))
      checkChannel(body, channel)
    })
  })

  it('Greater than 40 dmg to boss', () => {
    const key = 'dmg_high'
    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(2)
      expect(body[0].msg).to.equal(messages[key].chat.text)
      expect(body[1].msg).to.equal(tenor.gif(key))
      checkChannel(body, channel)
    })
  })

  it('Sustained more than 8 dmg', () => {
    const key = 'dmg_sustained'
    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(2)
      expect(body[0].msg).to.equal(messages[key].chat.text)
      expect(body[1].msg).to.equal(tenor.gif(key))
      checkChannel(body, channel)
    })
  })
})

describe('Quest', () => {
  const channel = 'quests'

  it('Starts', () => {
    const key = 'quest_start'

    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(2)
      expect(body[0].msg).to.equal(messages[key].chat.text)
      expect(body[1].msg).to.equal(tenor.gif(key))
      checkChannel(body, channel)
    })
  })

  it.only('Sends invites', () => {
    const key = 'quest_invite'

    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(2)
      expect(body[0].msg).to.equal(customTexts.quest_invite)
      expect(body[1].msg).to.equal(tenor.gif(key))
      checkChannel(body, channel)
    })
  })

  it('Finishes', () => {
    const key = 'quest_finish'
    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(2)
      expect(body[0].msg).to.equal(messages[key].chat.text)
      expect(body[1].msg).to.equal(tenor.gif(key))
      checkChannel(body, channel)
    })
  })
})

describe('Edge Cases', () => {
  it('Non system messages', () => {
    const key = 'non_system_msg'
    cy.request('POST', '/', messages[key]).should(({ body }) => {
      expect(body).to.have.length(0)
    })
  })
})
