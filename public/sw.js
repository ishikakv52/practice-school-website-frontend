self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};

  const title = data.title || 'Notification';
  const options = {
    body: data.body || '',
    icon: '/icon-192.png',   // apna app icon path daal do, ya hata do agar nahi hai
    badge: '/badge-72.png',  // optional, hata bhi sakte ho
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')  // click karne pe kaunsa page khule
  );
});