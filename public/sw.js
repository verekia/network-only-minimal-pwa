const offlineHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Offline</title>
    <meta name="theme-color" content="#f16529" />
    <style>
      body { background: #f0f0f0 }
      h1 {
        font-family: sans-serif;
        font-weight: lighter;
        color: #333;
        margin-top: 100px;
        padding: 20px;
      }
      a {
        color: #333;
        text-decoration: none;
        border-bottom: 2px solid #333;
        font-weight: initial;
        padding-bottom: 3px;
      }
    </style>
  </head>
  <body>
    <h1>It looks like you don't have access to internet. <a href="javascript:;" onclick="window.location.reload()">Refresh the page</a>.</h1>
  </body>
</html>
`

self.addEventListener('fetch', event =>
  event.respondWith(
    self.navigator.onLine
      ? fetch(event.request)
      : new Response(offlineHtml, { headers: { 'Content-Type': 'text/html' } })
  )
)

self.addEventListener('install', () => self.skipWaiting())
