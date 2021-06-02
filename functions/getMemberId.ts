interface Member {
  _id: string
  auth: {
    local: {
      username: string
    }
  }
  flags: {
    verifiedUsername: boolean
  }
  profile: {
    name: string
  }
  id: string
}

export default async function (username: string): Promise<string | null> {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }
  const response = await fetch(
    'https://habitica.com/api/v3/groups/party/members',
    options
  )
  const payload = await response.json()
  const members: Member[] = payload.data
  const member = members.find((m) => m.profile.name === username)
  if (member) {
    return member._id
  } else {
    return null
  }
}
