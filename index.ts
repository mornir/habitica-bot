import handleRequest from './functions'
import Toucan from 'toucan-js'

addEventListener('fetch', (event) => {
  const sentry = new Toucan({
    dsn: 'https://331a5a79b60446d1b8783a056efd3390@o567143.ingest.sentry.io/5710790',
    event,
    environment: ENVIRONMENT,
    allowedHeaders: ['user-agent'],
    allowedSearchParams: /(.*)/,
  })

  event.respondWith(handleRequest(event.request, sentry))
})
