export default function headParty(): Promise<Response> {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-user': X_API_USER,
      'x-api-key': X_API_KEY,
    },
  }
  return fetch('https://habitica.com/api/v3/user/class/cast/healAll', options)
}
