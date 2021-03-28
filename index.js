addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

  try {

    const { chat } = await request.json()

    if(chat.uuid === "system") {
      const content = { "content": chat.text }
      await fetch(DISCORD_WEBHOOK_URL, {
        body: JSON.stringify(content),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if(chat.info.type === "boss_damage" && parseInt(chat.info.userDamage) > 40)
      await fetch(DISCORD_WEBHOOK_URL, {
        body: JSON.stringify({"content": "https://tenor.com/view/damage-thats-alot-of-damage-jon-tron-gif-13054497"}),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response('OK')

  } catch(error) {

    console.error(error)
    return new Response('OK')

  }
}