var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BFDAAZ1rTSaNij2svvBwgfaXDlhW2j9snvCju-d8qpcDMNmycYm9WNUf9pIEZlVPRcaNlCAx6EcT1OMBiG-78JA",
    "privateKey": "gWGPQXXgb94tRB6ncxSwaHmvb4y9s8UWOm0yIDqjwrg"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fpwHxvBMi5k:APA91bHN01Yz57n3Fp4gJyP2zYWsHMUk6EvDF0NB799LhSp3AzQmBThxFOKoGLHGiTxZjJdWTXWi2u_TIv3rRxkzlkKDYy9kTUrGKV0GjBEdVbfZ_NsboK40pNlFY_lOQjIvs5LvbeSc",
    "keys": {
        "p256dh": "BK3grQURDoPaS3F4Qk5qdqCxV80pM/p/KBDLJJ+f7FjdTuGmIQMG3Wy3MCe6xN4zvJ4bzu26sLIssYIfMDAMUQ0=",
        "auth": "tIraVGbrQgdr267B7QrRFw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '541578636772',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);