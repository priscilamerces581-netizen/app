const telaInicial =
    document.getElementById("telaInicial");

const telaDocumento =
    document.getElementById("telaDocumento");

const imagemDocumento =
    document.getElementById("imagemDocumento");

const abaFrente =
    document.getElementById("abaFrente");

const abaVerso =
    document.getElementById("abaVerso");

const abaQr =
    document.getElementById("abaQr");


let toqueInicial = 0;
let toqueFinal = 0;


/* ABRIR DOCUMENTO */

function abrirDocumento() {

    telaInicial.style.display = "none";

    telaDocumento.style.display = "block";

}


/* VOLTAR */

function voltar() {

    telaDocumento.style.display = "none";

    telaInicial.style.display = "block";

}


/* MOSTRAR FRENTE */

function mostrarFrente() {

    imagemDocumento.src =
        "imagens/frente.jpeg";

    abaFrente.classList.add("ativa");

    abaVerso.classList.remove("ativa");

    abaQr.classList.remove("ativa");

}


/* MOSTRAR VERSO */

function mostrarVerso() {

    imagemDocumento.src =
        "imagens/verso.jpeg";

    abaVerso.classList.add("ativa");

    abaFrente.classList.remove("ativa");

    abaQr.classList.remove("ativa");

}


/* MOSTRAR QR CODE */

function mostrarQr() {

    imagemDocumento.src =
        "imagens/qrcode.png";

    abaQr.classList.add("ativa");

    abaFrente.classList.remove("ativa");

    abaVerso.classList.remove("ativa");

}


/* CLIQUE NAS ABAS */

abaFrente.addEventListener(
    "click",
    mostrarFrente
);

abaVerso.addEventListener(
    "click",
    mostrarVerso
);

abaQr.addEventListener(
    "click",
    mostrarQr
);


/* COMEÇO DO DESLIZE */

function inicioToque(event) {

    toqueInicial =
        event.changedTouches[0].screenX;

}


/* FIM DO DESLIZE */

function fimToque(event) {

    toqueFinal =
        event.changedTouches[0].screenX;

    const distancia =
        toqueFinal - toqueInicial;


    if (Math.abs(distancia) < 50) {

        return;

    }


    if (distancia < 0) {

        if (abaFrente.classList.contains("ativa")) {

            mostrarVerso();

        } else if (abaVerso.classList.contains("ativa")) {

            mostrarQr();

        }

    } else {

        if (abaQr.classList.contains("ativa")) {

            mostrarVerso();

        } else if (abaVerso.classList.contains("ativa")) {

            mostrarFrente();

        }

    }

}


/* SERVICE WORKER */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("sw.js")

                .catch(error => {

                    console.log(
                        "Erro no Service Worker:",
                        error
                    );

                });

        }
    );

}