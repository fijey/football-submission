importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([

        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/detail.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/materialize.css', revision: '1' },
        { url: '/css/universal.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/materialize.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
        { url: '/js/api.js', revision: '2' },
        { url: '/js/jquery-3.2.1.min.js', revision: '1' },
        { url: '/js/register.js', revision: '1' },
        { url: '/js/push.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/detail.js', revision: '1' },
    ], {
        ignoreUrlParametersMatching: [/.*/]
    });

    //FONT GOOGLE API
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts'
        })
    );
    //IMAGES
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        }),
    );


    //PAGES
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

    //API FOOTBALL
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'base-url-api',
            cacheExpiration: {
                maxAgeSeconds: 60 * 30
            }
        })
    );

}

else {
    console.log(`Workbox gagal dimuat`);
}


self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'images/avatar.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Football.info', options)
    );
});

