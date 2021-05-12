import texts from '../data/customTexts'

export default function sendWarning(userId: string): Promise<Response> {
  // If dev, send warning to myself
  if (ENVIRONMENT === 'dev') {
    userId = X_API_USER
  }
  return fetch('https://habitica.com/api/v3/members/send-private-message', {
    body: JSON.stringify({ message: texts.warning, toUserId: userId }),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
      'Content-Type': 'application/json',
    },
  })
}
