# Network-Only Minimal PWA

**The user experience of PWAs is great**. Every time I open a full-screen PWA from the home screen of my phone (and now desktop!), I'm delighted. "Ahhhh, that's niiiice". But you know what's not nice? The **fucking awful developer experience**. Every time I have to deal with this I want to throw my laptop out the window.

It feels like nothing works. You never know if the files that are rendered are up-to-date, you never know if the service worker being used is up-to-date, you never know if Chrome DevTool is being buggy, since it often doesn't reflect the actual content of the cache without having to click refresh, and worst of all, even after you click 50 times on _Update, Unregister, Stop, DELETE EVERYTHING, BYPASS EVERYTHING, CLEAR SITE DATA, CLOSE TAB, CLOSE ALL BROWSER WINDOWS, REINSTALL CHROME, FUCK YOU SERVICE WORKER_, it still shows you some old shit. Un-fucking-bearable.

I just want my users to be able to install my web app and open it without a URL bar, how hard should that be?

**SO**, from now on, I won't try to do any smart fine-tuning of my files, and will only return some offline HTML fallback in order to pass the requirements for the home screen install. And let's also `skipWaiting` while we're at it, to update the Service Worker as soon as possible.

So there you go, here is my setup for a headache-free Network-Only Minimal PWA. You can [try it online and offline here](https://network-only-minimal-pwa.verekia.now.sh).

## Files

**sw.js**
```js
const offlineHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Offline</title>
    <style>
      /* some styles */
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
```

**HTML files**
```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#f16529" />
  </head>
  <body>
    <p>Home</p>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/about">About</a></li>
    </ul>
    <script>
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register('/sw.js')
      }
    </script>
  </body>
</html>
```

**manifest.json**
```json
{
  "short_name": "Minimal PWA",
  "name": "Network-Only Minimal PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f16529",
  "theme_color": "#f16529",
  "icons": [
    {
      "src": "/img/icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/img/icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```
