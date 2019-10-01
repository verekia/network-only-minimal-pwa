# Headache-Free Installable Minimal PWA

**The user experience of PWAs is great**. Every time I open a full-screen PWA from the home screen of my phone (and now desktop!), I'm delighted. "Ahhhh, that's niiiice". But you know what's not nice? The **fucking awful developer experience**. Every time I have to deal with this I want to throw my laptop out the window.

It feels like nothing works. You never know if the files that are rendered are up-to-date, you never know if the service worker being used is up-to-date, you never know if Chrome DevTool is being buggy, since it often doesn't reflect the actual content of the cache (or cookies) without having to click refresh, and worst of all, even after you click 50 times on _Update, Unregister, Stop, DELETE EVERYTHING, BYPASS EVERYTHING, CLOSE TAB, CLOSE ALL BROWSERS WINDOWS, REINSTALL CHROME, FUCK YOU SERVICE WORKER_, it still shows you some old shit. Un-fucking-bearable.

I just want my user to be able to install my web app and open it full-screen, how hard should that be?

**SO**, from now on, I won't try to do any smart fine-tuning of my files, and will only use the `NetworkFirst` strategy of [Workbox](https://developers.google.com/web/tools/workbox), **for everything**. And let's also `skipWaiting` while we're at it, to update the Service Worker as soon as possible.

So there you go, here is my setup for a Headache-Free Installable Minimal PWA. You can [try it online here](https://minimal-sw.verekia.now.sh/).

## Files

**sw.js**:
```js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

workbox.routing.registerRoute(/.*/, new workbox.strategies.NetworkFirst())

self.addEventListener('install', () => self.skipWaiting())
```

**HTML files**:
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

**manifest.json**:
```json
{
  "short_name": "Minimal SW",
  "name": "Minimal Service Worker",
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
