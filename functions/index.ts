import postToDiscord from './postToDiscord'
import generateMessages from './generateMessages'
import getNonParticipants from './getNonParticipants'
import customTexts from '../data/customTexts'
import Toucan from 'toucan-js'
import sendWarning from './sendWarning'
import getMemberId from './getMemberId'
import healParty from './healParty'
import autoAcceptPendingQuest from './autoAcceptPendingQuest'
import markNotificationsRead from './markNotificationsRead'

export default async function handleRequest(
  request: Request,
  sentry: Toucan
): Promise<Response> {
  try {
    const payload = await request.json()

    if (
      payload.webhookType === 'questActivity' &&
      payload.type === 'questStarted'
    ) {
      const nonParticipants = await getNonParticipants()

      if (nonParticipants.length > 0) {
        await postToDiscord({
          msg: customTexts.quest_non_participants,
          channel: 'quest_non_participants',
          embeds: nonParticipants,
        })
      }

      return new Response(JSON.stringify(nonParticipants), {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
    }

    const messages = generateMessages(payload)

    if (ENVIRONMENT !== 'test') {
      for (const message of messages) {
        await postToDiscord(message)
      }
    }

    if (ENVIRONMENT === 'production') {
      if (
        payload.webhookType === 'questActivity' &&
        payload.type === 'questInvited'
      ) {
        await autoAcceptPendingQuest()
      }

      if (payload?.chat?.info?.bossDamage > 6) {
        /**** Heal party if damage sustained is greater than 6 ****/
        await Promise.all([healParty(), healParty(), healParty()])
      }

      /**** Send warning as a private message on Habitica if damage sustained is greater than 8 ****/
      if (payload?.chat?.info?.bossDamage > 8) {
        const userId = await getMemberId(payload.chat.info.user)
        if (userId) {
          const res = await sendWarning(userId)
          const data = await res.json()
          if (!data.success) {
            sentry.captureMessage(
              `${data.error}:  ${data.message} User ID: ${userId}`
            )
          }
        } else {
          sentry.captureMessage(
            `Username: ${payload.chat.info.user} was not found.`
          )
        }
      }

      markNotificationsRead(sentry)
    }

    return new Response(JSON.stringify(messages), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } catch (error) {
    sentry.captureException(error)
    return new Response('OK')
  }
}
