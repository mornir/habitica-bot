export default async function getNonParticipants() {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }

  // TODO: check if TypeScript would have caught that error (missing brackets)
  const [rawQuest, rawParty] = await Promise.all([
    fetch('https://habitica.com/api/v3/groups/party', options),
    fetch('https://habitica.com/api/v3/groups/party/members', options),
  ])

  const quest = await rawQuest.json()
  const party = await rawParty.json()

  const questMembers = Object.keys(quest.data.quest.members)
  const partyMembers = party.data

  return partyMembers
    .filter((member: any) => !questMembers.includes(member._id))
    .map((nonParticipant: any) => {
      return {
        title: nonParticipant.profile.name,
        url: 'https://habitica.com/profile/' + nonParticipant._id,
      }
    })
}
