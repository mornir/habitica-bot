import Toucan from 'toucan-js'

interface Notification {
  type: string
  data: {
    group: {
      id: string
      name: string
    }
  }
  id: string
  seen: boolean
}

export default async function markNotificationsRead(
  sentry: Toucan
): Promise<void> {
  const unwantedNotificationType = ['NEW_CHAT_MESSAGE']
  const headers = {
    Accept: 'application/json',
    'x-api-user': X_API_USER,
    'x-api-key': X_API_KEY,
  }

  const response = await fetch('https://habitica.com/api/v3/user', {
    headers,
  })
  const data = await response.json()

  const notifications = data.notifications as Notification[]

  const notificationIds = notifications
    .filter((n) => unwantedNotificationType.includes(n.type))
    .map((n) => n.id)

  if (notificationIds.length) {
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({ notificationIds }),
    }

    const data = await fetch(
      'https://habitica.com/api/v3/notifications/read',
      options
    ).then((res) => res.json())

    sentry.captureMessage(JSON.stringify(data))
  }
}