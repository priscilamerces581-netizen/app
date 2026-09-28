const CACHE_NAME = "modelo-escolar-v2";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./imagens/frente.jpeg",
    "./imagens/verso.jpeg",
    "./imagens/bandeira-sp.png",
    "./imagens/icone-carteira.png",
    "./imagens/icone-compartilhar.png",
    "./imagens/icone-servicos.png",
    "./imagens/qrcode.png"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ARQUIVOS);
        })

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(chaves => {

            return Promise.all(

                chaves
                    .filter(chave => chave !== CACHE_NAME)
                    .map(chave => caches.delete(chave))

            );

        })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
            .catch(() => caches.match(event.request))

    );

});
