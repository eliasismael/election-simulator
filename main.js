import { propuestas } from "./propuestas.js";

// Botones para crear candidatos y votantes
const cantCandidatos = document.getElementById("cantCandidatos");
const cantVotantes = document.getElementById("cantVotantes");

// Formularios para cada boton
const formCandidatos = document.getElementById("formCandidatos");
const formVotantes = document.getElementById("formVotantes");
const formMostrarCand = document.getElementById("formMostrarCandidato");
const formMostrarVot = document.getElementById("formMostrarVotante");

// Textos para anunciar la creación de candidatos y votantes
const anuncioCandGenerados = document.getElementById("anuncioCandGenerados");
const anuncioVotGenerados = document.getElementById("anuncioVotGenerados");

const btnVotar = document.getElementById("votar");
const btnReset = document.getElementById("reset");

// Valor de los input
const numCandidato = document.getElementById("numCandidato");
const numVotante = document.getElementById("numVotante");

// Lo que devuelve el programa
const msg = document.getElementById("msg");

const botones = document.querySelectorAll(".boton");

// Variables que se van a inicializar cuando se rellenen los inputs necesarios
let _cantCandidatos, _cantVotantes, _numCandidato, _numVotante;

formCandidatos.addEventListener("submit", (event) => {
    event.preventDefault();
    _cantCandidatos = parseInt(cantCandidatos.value);
    generarCandidatos(_cantCandidatos);
});

formVotantes.addEventListener("submit", (event) => {
    event.preventDefault();
    _cantVotantes = parseInt(cantVotantes.value);
    generarVotantes(_cantVotantes);
});

btnVotar.addEventListener("click", votar);
btnReset.addEventListener("click", reset);

formMostrarCand.addEventListener("submit", (event) => {
    event.preventDefault();
    _numCandidato = numCandidato.value;
    mostrarCandidato(_numCandidato);
});

formMostrarVot.addEventListener("submit", (event) => {
    event.preventDefault();
    _numVotante = numVotante.value;
    mostrarVotante(_numVotante);
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
const ideologias = [
    "liberal",
    "socialista",
    "socialdemócrata",
    "monarquista",
    "anarquista",
    "fascista",
    "comunista",
    "libertario",
    "conservador",
    "progresista",
];
const cantIdeologias = ideologias.length;

let candidatos = [];
let votantes = [];

// Solo se podrán crear candidatos y votantes una vez
let candidatosCreados = false;
let votantesCreados = false;
let votarUsada = false;
let votando = false;

// Variables para manejar el código asíncrono en la función "votar"
let contando, esperarGanador, mostrarEmpate, return1, return2;

// Creamos dnis de 8 dígitos (desde 10 millones a 99.999.999)
// Establecemos la cantidad máxima posible de distintos dni
const MAX_DNI_POSIBLES = 89999999;
let llamadasAInventarDNI = 0;
let dniCreados = [];
// Variable que va acontener los dni creados para que no se repitan

function inventarDNI() {
    if (llamadasAInventarDNI === MAX_DNI_POSIBLES) {
        return "No se pueden crear más dni";
    }

    const DIGITOS_DNI = 8;
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const cantNums = nums.length;
    // Array para añadir números que luego se convierte en string
    let dni = [];
    // Número a añadir
    let num;
    // CREAR DNI ÚNICOS E IRREPETIBLES:
    do {
        // Reinicializar dni como array vacio por si la condición del while se cumplió, ya que durante el proceso deja de ser un array
        dni = [];

        // Obtener el primer número y establecer que este no sea 0
        do {
            num = Math.floor(Math.random() * cantNums);
        } while (num === 0);
        dni.push(num);

        // Obtener los números restantes
        for (let i = 1; i < DIGITOS_DNI; i++) {
            num = Math.floor(Math.random() * cantNums);
            dni.push(num);
        }

        // Añadir puntos
        // Después del segundo número
        dni.splice(2, 0, ".");
        // Después del quinto número, teniendo en cuenta que ya añadimos el primer punto
        dni.splice(6, 0, ".");

        // Convertir a string
        dni = dni.toString();
        // Dividir cadena por las comas y luego unirlas sin caracter que los separe
        dni = dni.split(",").join("");

        // Repetir la creacion deL dni mientras ese dni ya haya sido creado:
    } while (dniCreados.indexOf(dni) !== -1);
    dniCreados.push(dni);
    llamadasAInventarDNI++;
    return dni;
}

function inventarSustProp() {
    const MIN_NUMBER = 3;
    const MAX_NUMBER = 7;
    // Cantidad de caracteres que va a tener el sustantivo propio
    const numLetras = Math.round(
        Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
    );
    const vocales = ["a", "e", "i", "o", "u"];
    const consonantes = ["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z",];
    const cantidadVocales = vocales.length;
    const cantidadConsonantes = consonantes.length;
    let sustProp = "";

    for (let i = 0; i < numLetras; i++) {
        const letra =
            i % 2 === 0
                ? consonantes[Math.floor(Math.random() * cantidadConsonantes)]
                : vocales[Math.floor(Math.random() * cantidadVocales)];
        sustProp += letra;
    }

    const primeraLetra = sustProp.slice(0, 1).toUpperCase();
    const resto = sustProp.substring(1, numLetras);
    sustProp = primeraLetra + resto;
    return sustProp;
}

// Función para deshabilitar y habilitar botones mientras se cuentan los votos
// Esto es para evitar conflictos con el código asíncrono
function manejarBotones() {
    if (votando)
        for (const boton of botones) {
            boton.setAttribute("disabled", "");
        }
    else
        for (const boton of botones) {
            boton.removeAttribute("disabled");
        }
}

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

    let propuestaFinal =
        ecoFinal + "<br><br>" + polFinal + "<br><br>" + socFinal;
    return propuestaFinal;
}

function generarVotantes(_cantVotantes) {
    if (votantesCreados) return (msg.innerHTML = "Ya se crearon los votantes");

    if (_cantVotantes === undefined || isNaN(parseInt(_cantVotantes)))
        return (msg.innerHTML = "Tenés que decirme cuántos votantes querés");

    if (_cantVotantes <= 0)
        return (msg.innerHTML = "Se necesita al menos un votante");

    if (_cantVotantes > MAX_DNI_POSIBLES)
        return (msg.innerHTML = "Máximo 89.999.999 de votantes");

    msg.innerHTML = "";

    // Asignar votantes
    let id = 1;
    for (let i = 0; i < _cantVotantes; i++) {
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

    votantesCreados = true;
    anuncioVotGenerados.innerHTML = `¡${_cantVotantes} votantes generados con éxito!`;
}

function generarCandidatos(_cantCandidatos) {
    if (candidatosCreados)
        return (msg.innerHTML = "Ya se crearon los candidatos");

    if (_cantCandidatos === undefined || isNaN(parseInt(_cantCandidatos)))
        return (msg.innerHTML = "Tenés que decirme cuántos candidatos querés");

    if (_cantCandidatos < 2)
        return (msg.innerHTML = "Se necesitan al menos 2 candidatos");

    if (_cantCandidatos > cantIdeologias)
        return (msg.innerHTML = "No hay tantas ideologías por las que votar");

    msg.innerHTML = "";

    // Generar candidatos con ideologías aleatóreas
    let indiceRandom;
    let numObtenidos = [];
    let ideologiaRandom;
    let candidatoGenerado;

    // Buscamos una ideología para cada candidato sin que se repitan
    for (let i = 0; i < _cantCandidatos; i++) {
        do {
            indiceRandom = Math.floor(Math.random() * cantIdeologias);
        } while (numObtenidos.indexOf(indiceRandom) !== -1);
        /* Repetimos esto mientras ya se haya obtenido ese número en un ciclo anterior, así
           nos aseguramos de no asignar la misma ideología a dos candidatos distintos. */
        // Justamente para eso añadimos el número al array.
        numObtenidos.push(indiceRandom);

        ideologiaRandom = ideologias[indiceRandom];
        candidatoGenerado = new Candidato(
            inventarSustProp(),
            inventarSustProp(),
            ideologiaRandom,
            generarPropuesta(),
            0
        );
        candidatos.push(candidatoGenerado);
    }

    candidatosCreados = true;
    anuncioCandGenerados.innerHTML = `¡${_cantCandidatos} candidatos generados con éxito!`;
}

function mostrarVotante(_id) {
    if (!votantesCreados) return (msg.innerHTML = "No hay votantes");

    if (isNaN(parseInt(_id)))
        return (msg.innerHTML = "Dame un número de votante");

    if (_id <= 0 || _id > votantes.length)
        return (msg.innerHTML = "No existe ese número de votante");

    const votante = votantes[_id - 1];
    msg.innerHTML = `Soy ${votante.Nombre} ${votante.Apellido}, mi dni es ${votante.DNI} y soy de la ciudad de ${votante.Ciudad}.`;
}

function mostrarCandidato(_num) {
    if (!candidatosCreados) return (msg.innerHTML = "No hay candidatos");

    if (isNaN(parseInt(_num)))
        return (msg.innerHTML = "Dame un número de candidato");

    if (_num <= 0 || _num > candidatos.length)
        return (msg.innerHTML = "No existe ese número de candidato");

    let candidato = candidatos[_num - 1];
    msg.innerHTML = `Soy ${candidato.nombre} ${candidato.apellido}, el candidato representante del partido ${candidato.ideologia}. <br><br> Nosotros ${candidato.propuestas}`;
    window.scrollBy(0, 1000);
}

function votar() {
    if (votarUsada)
        return (msg.innerHTML = "Ya se votó. Inicia una nueva votación.");

    if (!candidatosCreados && !votantesCreados)
        return (msg.innerHTML = "No hay ni candidatos ni votantes");

    if (!candidatosCreados) return (msg.innerHTML = "No hay candidatos");

    if (!votantesCreados) return (msg.innerHTML = "No hay votantes");

    if (votantes.length < 0)
        return (msg.innerHTML = "Se necesita al menos un votante para votar");

    if (candidatos.length < 2)
        return (msg.innerHTML =
            "Se necesitan al menos 2 candidatos para votar");

    votando = true;
    manejarBotones();
    votarUsada = true;

    contando = setTimeout(() => (msg.innerHTML = "Contando votos..."), 0);
    msg.innerHTML = contando;

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
    let empate = false;
    let desempatantes = [];

    candidatos.forEach((desempatante) => {
        const values = Object.values(desempatante);
        // 4 es el índice del valor de la propiedad "votosAcumulados" en el array "values"
        if (values[4] === votosDelGanador) desempatantes.push(desempatante);
    });

    // Desempatar:
    let numDesempatantes = desempatantes.length;
    if (numDesempatantes >= 2) {
        let anuncioEmpate = "Hubo un empate. Vamos a desempatar entre: ";
        desempatantes.forEach((desempatante) => {
            desempatante.participoEnDesempate = true;
            desempatante.ganoEnDesempate = false;
            anuncioEmpate +=
                "<br>" +
                "- " +
                desempatante.nombre +
                " " +
                desempatante.apellido +
                ` (${desempatante.ideologia})`;
        });

        let tiempoAnuncioEmpate = 3000;
        mostrarEmpate = setTimeout(
            () => (msg.innerHTML = anuncioEmpate),
            tiempoAnuncioEmpate
        );
        msg.innerHTML = mostrarEmpate;

        const bajar = () => {
            setTimeout(() => {
                window.scrollBy(0, 1000);
            }, tiempoAnuncioEmpate);
        };
        bajar();

        let numGanador = Math.floor(Math.random() * numDesempatantes);
        ganador = desempatantes[numGanador];
        ganador.ganoEnDesempate = true;
        empate = true;
    }

    // Si hubo empate que tarde más en aparecer el anuncio de espera del ganador
    let time = empate ? 6000 : 3000;
    esperarGanador = setTimeout(
        () => (msg.innerHTML += "<br>" + "Y el ganador es..."),
        time
    );
    msg.innerHTML = esperarGanador;

    const bajar = () => {
        setTimeout(() => {
            window.scrollBy(0, 1000);
        }, time);
    };
    bajar();

    // Así mismo incrementar el tiempo del anuncio final en función de si se extendió el tiempo anterior o no
    let time2 = empate ? 9000 : 6000;
    if (empate) {
        return1 = setTimeout(() => {
            votando = false;
            manejarBotones();
            msg.innerHTML = `El ganador es el candidato ${ganador.ideologia} ${ganador.nombre} ${ganador.apellido}`;
        }, time2);

        const bajar = () => {
            setTimeout(() => {
                window.scrollBy(0, 1000);
            }, time2);
        };
        bajar();
    } else {
        return2 = setTimeout(() => {
            votando = false;
            manejarBotones();
            msg.innerHTML = `El ganador es el candidato ${ganador.ideologia} ${ganador.nombre} ${ganador.apellido} con ${ganador.votosAcumulados} votos`;
        }, time2);

        const bajar = () => {
            setTimeout(() => {
                window.scrollBy(0, 1000);
            }, time2);
        };
        bajar();
    }
}

function reset() {
    votando = false;
    manejarBotones();
    clearTimeout(contando);
    clearTimeout(esperarGanador);
    clearTimeout(mostrarEmpate);
    clearTimeout(return1);
    clearTimeout(return2);
    msg.innerHTML = "";
    _cantCandidatos = undefined;
    _cantVotantes = undefined;
    candidatosCreados = false;
    votantesCreados = false;
    votarUsada = false;
    anuncioCandGenerados.innerHTML = "";
    anuncioVotGenerados.innerHTML = "";
    candidatos.length = 0;
    votantes.length = 0;
    cantCandidatos.value = "";
    cantVotantes.value = "";
    numCandidato.value = "";
    numVotante.value = "";
}
