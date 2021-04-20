interface Member {
  _id: string
  profile: {
    name: string
  }
}

export default async function getNonParticipants(): Promise<Embed[]> {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }

  const [rawQuest, rawParty] = await Promise.all([
    fetch('https://habitica.com/api/v3/groups/party', options),
    fetch('https://habitica.com/api/v3/groups/party/members', options),
  ])

  const quest = await rawQuest.json()
  const party = await rawParty.json()

  const questMembers = Object.keys(quest.data.quest.members)
  const partyMembers = party.data

  return partyMembers
    .filter((member: Member) => !questMembers.includes(member._id))
    .map((nonParticipant: Member) => {
      return {
        title: nonParticipant.profile.name,
        url: 'https://habitica.com/profile/' + nonParticipant._id,
      }
    })
}
