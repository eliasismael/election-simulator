import {
    inventarSustProp,
    inventarDNI,
    MAX_DNI_POSIBLES,
    llamadasAInventarDNI,
    dniCreados,
} from "./funciones-internas.js";
import { propuestas } from "./propuestas.js";

const cantidadCandidatos = document.getElementById("cantidadCandidatos");
const cantidadVotantes = document.getElementById("cantidadVotantes");

const formCandidatos = document.getElementById("formCandidatos");
const formVotantes = document.getElementById("formVotantes");
const formMostrarCand = document.getElementById("formMostrarCandidato");
const formMostrarVot = document.getElementById("formMostrarVotante");

const anuncioCandGenerados = document.getElementById("anuncioCandGenerados");
const anuncioVotGenerados = document.getElementById("anuncioVotGenerados");

const btnVotar = document.getElementById("votar");
const btnReset = document.getElementById("reset");

const numeroCandidato = document.getElementById("numeroCandidato");
const numeroVotante = document.getElementById("numeroVotante");

const mensajes = document.getElementById("mensajes");

// Variables que se van a inicializar cuando se rellenen los inputs necesarios
let _cantidadCandidatos;
let _cantidadVotantes;
let _numeroCandidato;
let _numeroVotante;

formCandidatos.addEventListener("submit", (event) => {
    event.preventDefault();
    _cantidadCandidatos = parseInt(cantidadCandidatos.value);
    generarCandidatos(_cantidadCandidatos);
});

formVotantes.addEventListener("submit", (event) => {
    event.preventDefault();
    _cantidadVotantes = parseInt(cantidadVotantes.value);
    generarVotantes(_cantidadVotantes);
});

btnVotar.addEventListener("click", votar);
btnReset.addEventListener("click", reset);

formMostrarCand.addEventListener("submit", (event) => {
    event.preventDefault();
    _numeroCandidato = numeroCandidato.value;
    mostrarCandidato(_numeroCandidato);
});

formMostrarVot.addEventListener("submit", (event) => {
    event.preventDefault();
    _numeroVotante = numeroVotante.value;
    mostrarVotante(_numeroVotante);
});

class Votante {
    constructor(nombre, apellido, dni, ciudad, id, yaVoto) {
        this.Nombre = nombre;
        this.Apellido = apellido;
        this.DNI = dni;
        this.Ciudad = ciudad;
        this.ID = id;
        this.yaVoto = yaVoto;
    }
}

class Candidato {
    constructor(nombre, apellido, ideologia, propuestas, votosAcumulados) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.ideologia = ideologia;
        this.propuestas = propuestas;
        this.votosAcumulados = votosAcumulados;
    }
}

//  Para asignar a cada candiato según se vayan creando
const ideologiaCandidatos = [
    "liberal",
    "socialista",
    "socialdemócrata",
    "monarquista",
    "anarquista",
    "fascista",
    "comunista",
    "libertario",
    "marxista",
    "conservador",
    "progresista",
];
const cantidadIdeologias = ideologiaCandidatos.length;

let candidatos = [];
let votantes = [];

// Solo se podrán crear candidatos y votantes una vez
let generarCandidatosUsada = false;
let generarVotantesUsada = false;
let votarUsada = false;

function generarPropuesta() {
    // Propuesta económica
    let eco = Object.entries(propuestas.propuestasEconomicas);
    // (Array de [ [prop, [value]],[prop, [value]], [prop, [value]]... ])

    // El 1 es constante porque siempre accedemos a los valores de la respectiva propiedad,
    // y estos siempre son el índice 1 de cada subarray
    let ecoProps = [
        eco[0][1],
        eco[1][1],
        eco[2][1],
        eco[3][1],
        eco[4][1],
        eco[5][1],
    ];

    // Recorremos el array de cada propiedad pata pbtener aleatóreamente un elemento de cada una
    let ecoValues = ecoProps.map((elements) => {
        let numElement = Math.floor(Math.random() * elements.length);
        return elements[numElement];
    });

    // Convertir el array a string, quitar las comas y juntar los caracteres sin elementos de por medio
    let ecoFinal = ecoValues.toString().split(",").join("");

    // Repetir el proceso por cada tipo de propuesta
    // Propuesta política
    let pol = Object.entries(propuestas.propuestasPoliticas);

    let polProps = [
        pol[0][1],
        pol[1][1],
        pol[2][1],
        pol[3][1],
        pol[4][1],
        pol[5][1],
    ];

    let polValues = polProps.map((elements) => {
        let numElement = Math.floor(Math.random() * elements.length);
        return elements[numElement];
    });

    let polFinal = polValues.toString().split(",").join("");

    // Propuesta social
    let soc = Object.entries(propuestas.propuestasSociales);

    let socProps = [
        soc[0][1],
        soc[1][1],
        soc[2][1],
        soc[3][1],
        soc[4][1],
        soc[5][1],
    ];

    let socValues = socProps.map((elements) => {
        let numElement = Math.floor(Math.random() * elements.length);
        return elements[numElement];
    });

    let socFinal = socValues.toString().split(",").join("");

    let propuestaFinal = ecoFinal + " " + polFinal + " " + socFinal;
    return propuestaFinal;
}

function generarVotantes(_cantidadVotantes) {
    if (generarVotantesUsada) {
        mensajes.innerHTML = "Esta función ya se usó";
        return console.error("Esta función ya se usó");
    }
    if (_cantidadVotantes === undefined || isNaN(parseInt(_cantidadVotantes))) {
        mensajes.innerHTML = "Tenés que decirme cuantos votantes querés";
        return console.error("Tenés que decirme cuantos votantes querés");
    }
    if (_cantidadVotantes <= 0) {
        mensajes.innerHTML = "Se necesita al menos un votante";
        return console.error("Se necesita al menos un votante");
    }
    if (_cantidadVotantes > MAX_DNI_POSIBLES) {
        mensajes.innerHTML = "Máximo 89.999.999 de votantes";
        return console.error("Máximo 89.999.999 de votantes");
    }

    mensajes.innerHTML = "";
    // Asignar votantes
    let id = 1;
    for (let i = 0; i < _cantidadVotantes; i++) {
        let votante = new Votante(
            inventarSustProp(),
            inventarSustProp(),
            inventarDNI(),
            inventarSustProp(),
            id,
            false
        );
        votantes.push(votante);
        id++;
    }

    generarVotantesUsada = true;

    let anuncio = `¡${_cantidadVotantes} votantes generados con éxito!`;
    anuncioVotGenerados.innerHTML = anuncio;
    return console.log(anuncio);
}

function generarCandidatos(_cantidadCandidatos) {
    if (generarCandidatosUsada) {
        mensajes.innerHTML = "Esta función ya se usó";
        return console.error("Esta función ya se usó");
    }
    if (
        _cantidadCandidatos === undefined ||
        isNaN(parseInt(_cantidadCandidatos))
    ) {
        mensajes.innerHTML = "Tenés que decirme cuantos candidatos querés";
        return console.error("Tenés que decirme cuantos candidatos querés");
    }
    if (_cantidadCandidatos < 2) {
        mensajes.innerHTML = "Se necesitan al menos 2 candidatos";
        return console.error("Se necesitan al menos 2 candidatos");
    }
    if (_cantidadCandidatos > cantidadIdeologias) {
        mensajes.innerHTML = "No hay tantas ideologías por las que votar";
        return console.error("No hay tantas ideologías por las que votar");
    }

    mensajes.innerHTML = "";

    // Generar candidatos con ideologías aleatóreas
    let indiceRandom;
    let numObtenidos = [];
    let ideologiaRandom;
    let candidatoGenerado;

    // Buscamos una ideología para cada candidato sin que se repitan
    for (let i = 0; i < _cantidadCandidatos; i++) {
        do {
            indiceRandom = Math.floor(Math.random() * cantidadIdeologias);
        } while (numObtenidos.indexOf(indiceRandom) !== -1);
        // Repetimos esto mientras ya se haya obtenido ese número en un ciclo anterior, así
        // nos aseguramos de no asignar la misma ideología a dos candidatos distintos.

        // Justamente para eso añadimos el número al array.
        numObtenidos.push(indiceRandom);

        ideologiaRandom = ideologiaCandidatos[indiceRandom];
        candidatoGenerado = new Candidato(
            inventarSustProp(),
            inventarSustProp(),
            ideologiaRandom,
            generarPropuesta(),
            0
        );
        candidatos.push(candidatoGenerado);
    }

    generarCandidatosUsada = true;

    let anuncio = `¡${_cantidadCandidatos} candidatos generados con éxito!`;
    anuncioCandGenerados.innerHTML = anuncio;
    return console.log(anuncio);
}

function mostrarVotante(_id) {
    if (!generarVotantesUsada) {
        mensajes.innerHTML = "No hay votantes";
        return console.error("No hay votantes");
    }
    if (isNaN(parseInt(_id))) {
        mensajes.innerHTML = "Dame un número de votante";
        return console.error("Dame un número de votante");
    }
    if (_id <= 0 || _id > votantes.length) {
        mensajes.innerHTML = "No existe ese número de votante";
        return console.error("No existe ese número de votante");
    }

    const votante = votantes[_id - 1];
    const presentacion = `Soy ${votante.Nombre} ${votante.Apellido}, mi dni es ${votante.DNI} y soy de la ciudad de ${votante.Ciudad}.`;
    mensajes.innerHTML = presentacion;
    return console.log(presentacion);
}

function mostrarCandidato(_num) {
    if (!generarCandidatosUsada) {
        mensajes.innerHTML = "No hay candidatos";
        return console.error("No hay candidatos");
    }
    if (isNaN(parseInt(_num))) {
        mensajes.innerHTML = "Dame un número de candidato";
        return console.error("Dame un número de candidato");
    }
    if (_num <= 0 || _num > candidatos.length) {
        mensajes.innerHTML = "No existe ese número de candidato";
        return console.error("No existe ese número de candidato");
    }

    let candidato = candidatos[_num - 1];
    let presentacion = `Soy ${candidato.nombre} ${candidato.apellido}, el candidato representante del partido ${candidato.ideologia}. <br> Nosotros ${candidato.propuestas}`;
    mensajes.innerHTML = presentacion;
    return console.log(presentacion);
}

async function votar() {
    if (votarUsada) {
        mensajes.innerHTML = "Ya se votó. Inicia una nueva votación.";
        return console.error("Ya se votó. Inicia una nueva votación.");
    }
    if (!generarCandidatosUsada && !generarVotantesUsada) {
        mensajes.innerHTML = "No hay ni candidatos ni votantes";
        return console.error("No hay ni candidatos ni votantes");
    }
    if (!generarCandidatosUsada) {
        mensajes.innerHTML = "No hay candidatos";
        return console.error("No hay candidatos");
    }
    if (!generarVotantesUsada) {
        mensajes.innerHTML = "No hay votantes";
        return console.error("No hay votantes");
    }
    if (votantes.length < 0) {
        mensajes.innerHTML = "Se necesita al menos un votante para votar";
        return console.error("Se necesita al menos un votante para votar");
    }
    if (candidatos.length < 2) {
        mensajes.innerHTML = "Se necesitan al menos 2 candidatos para votar";
        return console.error("Se necesitan al menos 2 candidatos para votar");
    }

    votarUsada = true;

    // Hacer votar a los votantes
    votantes.forEach((votante) => {
        const numRandom = Math.floor(Math.random() * candidatos.length);
        candidatos[numRandom].votosAcumulados += 1;
        votante.yaVoto = true;
    });

    // Buscar ganador
    let ganador;
    let votosDelGanador = 0;
    candidatos.forEach((candidato) => {
        if (candidato.votosAcumulados > votosDelGanador) {
            votosDelGanador = candidato.votosAcumulados;
            ganador = candidato;
        }
    });

    // Si hay desempatantes
    let huboEmpate = false;
    let desempatantes = [];

    candidatos.forEach((desempatante) => {
        const values = Object.values(desempatante);
        // 4 es el índice del valor de la propiedad "votosAcumulados" en el array "values"
        if (values[4] === votosDelGanador) desempatantes.push(desempatante);
    });

    mensajes.innerHTML = "Contando votos...";

    // Desempatar:
    let numDesempatantes = desempatantes.length;
    if (numDesempatantes >= 2) {
        let anuncioEmpate = ["Hubo un empate. Vamos a desempatar entre:"];

        desempatantes.forEach((desempatante) => {
            desempatante.participoEnDesempate = true;
            desempatante.ganoEnDesempate = false;
            anuncioEmpate.push(
                "<br>" +
                    "- " +
                    desempatante.nombre +
                    " " +
                    desempatante.apellido +
                    ` (${desempatante.ideologia})`
            );
        });

        anuncioEmpate.toString().split(",").join("") + "Desempatando...";

        const mostrarEmpate = async function () {
            setTimeout(() => {
                mensajes.innerHTML = anuncioEmpate;
                console.log(anuncioEmpate);
            }, 3000);
        };
        mostrarEmpate();

        let numGanador = Math.floor(Math.random() * numDesempatantes);
        ganador = desempatantes[numGanador];
        ganador.ganoEnDesempate = true;
        huboEmpate = true;
    }

    // Si hubo empate que tarde más en aparecer el anuncio de espera del ganador
    let time = huboEmpate ? 6000 : 3000;
    const esperarGanador = async function () {
        setTimeout(() => {
            mensajes.innerHTML += "<br>" + "<br>" + "Y el ganador es...";
        }, time);
    };
    esperarGanador();

    // Así mismo incrementar el tiempo del anuncio final en función de si se extendió el tiempo anterior o no
    let time2 = huboEmpate ? 9000 : 6000;

    if (huboEmpate) {
        return setTimeout(() => {
            const anuncio = `El ganador es el candidato ${ganador.ideologia} ${ganador.nombre} ${ganador.apellido}`;
            mensajes.innerHTML = anuncio;
            console.log(anuncio);
        }, time2);
    } else {
        return setTimeout(() => {
            const anuncio = `El ganador es el candidato ${ganador.ideologia} ${ganador.nombre} ${ganador.apellido} con ${ganador.votosAcumulados} votos`;
            mensajes.innerHTML = anuncio;
            console.log(anuncio);
        }, time2);
    }
}

function reset() {
    console.clear();
    mensajes.innerHTML = "";
    _cantidadCandidatos = undefined;
    _cantidadVotantes = undefined;
    generarCandidatosUsada = false;
    generarVotantesUsada = false;
    votarUsada = false;
    anuncioCandGenerados.innerHTML = "";
    anuncioVotGenerados.innerHTML = "";
    candidatos.length = 0;
    votantes.length = 0;
    cantidadCandidatos.value = "";
    cantidadVotantes.value = "";
    numeroCandidato.value = "";
    numeroVotante.value = "";
}
