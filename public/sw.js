const sendMessage = () => {
  new Promise((resolve, reject) => {
    const baseDB = self.indexedDB.open('AppDatabase', 10);
    let db;
    baseDB.onsuccess = ev  => {
      db = baseDB.result;
      let transaction = db.transaction(["messages"], "readwrite");
      let objectStore = transaction.objectStore("messages");
      let objectStoreRequest = objectStore.getAll();
      objectStoreRequest.onsuccess = (result) => {
        let contentToSave = objectStoreRequest.result[0].content
        // Ici appel possible à de l'ajax pour envoyer le content à un back existant comme le localStorage n'est pas accessible par le service worker
        // localStorage.setItem("messages", JSON.stringify(contentToSave))
      };
    };
  })
}


const cacheUrls = [
  '/',
  '/static/css/*.css',
  '/static/css/**/*.css',
  '/static/js/*.js',
  '/static/js/**/*.js',
  '/media/**/*.jpg',
  '/media/*.jpg'
];

self.addEventListener("install", installEvent => {
  console.log("self =>", self)
  installEvent.waitUntil(
    caches.open("static").then(cache => {
      console.log("mis en cache")
      cache.addAll(cacheUrls)
    })
  )
})


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      console.log("fetch", caches)
      return res || fetch(fetchEvent.request)
    })
  )
})


self.addEventListener("sync", function (event) {
  console.log("sync event", event);
  if (event.tag === "sendMessage") {
    event.waitUntil(sendMessage());
  }
});
