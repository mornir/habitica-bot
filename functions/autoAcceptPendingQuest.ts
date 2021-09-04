export default function autoAcceptPendingQuest(): Promise<Response> {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }
  return fetch(
    `https://habitica.com/api/v3/groups/${GROUP_ID}}/quests/accept`,
    options
  )
}
