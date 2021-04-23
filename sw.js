importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  { url: '/manifest.json', revision: '2' },
  { url: '/index.html', revision: '2' },
  { url: '/nav.html', revision: '2' },
  { url: '/profilTeam.html', revision: '2' },
  { url: '/css/materialize.min.css', revision: '2' },
  { url: '/css/style.css', revision: '2' },
  { url: '/img/192-icon.png', revision: '2' },
  { url: '/img/512-icon.png', revision: '2' },
  { url: '/js/materialize.min.js', revision: '2' },
  { url: '/js/nav.js', revision: '2' },
  { url: '/js/api.js', revision: '2' },
  { url: '/js/idb.js', revision: '2' },
  { url: '/js/db.js', revision: '2' },
  { url: '/js/sw-reg-index.js', revision: '2' },
  { url: '/js/sw-reg-profilTeam.js', revision: '2' }
],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);
workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts'
  })
);


workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://api.football-data.org",
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'API-source'
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);


self.addEventListener('push', event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/img/512-icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
