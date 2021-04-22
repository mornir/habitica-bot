import postToDiscord from './postToDiscord'
import generateMessages from './generateMessages'
import getNonParticipants from './getNonParticipants'
import customTexts from '../data/customTexts'
import Toucan from 'toucan-js'

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

    const messages = await generateMessages(payload)
    for (const message of messages) {
      await postToDiscord(message)
    }

    return new Response(JSON.stringify(messages), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } catch (error) {
    console.error(error.message)
    sentry.captureException(error)
    return new Response('OK')
  }
}
