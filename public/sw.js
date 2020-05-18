const offlineHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Offline</title>
    <meta charset="UTF-8">
    <meta name="theme-color" content="#f16529" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
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

self.addEventListener('fetch', event => {
  if (self.navigator.onLine === false) {
    event.respondWith(new Response(offlineHtml, { headers: { 'Content-Type': 'text/html' } }))
  }
})

self.addEventListener('install', () => self.skipWaiting())

// https://github.com/NekR/self-destroying-sw

// self.addEventListener('activate', () => {
//   setTimeout(() => {
//     self.registration
//       .unregister()
//       .then(() => self.clients.matchAll())
//       .then((clients) => {
//         clients.forEach((client) => client.navigate(client.url))
//       })
//   }, 5000)
// })
