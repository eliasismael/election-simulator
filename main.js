class Votante {
    constructor(id, yaVoto) {
        this.id = id
        this.yaVoto = yaVoto
    }
}

class Candidato {
    constructor(ideologia, votosAcumulados) {
        this.ideologia = ideologia;
        this.votosAcumulados = votosAcumulados;
    }
}

//para asignar a cada candiato según se vayan creando
let ideologiaCandidatos = ["liberal", "socialista", "socialdemocrata", "monarquista", "anarquista", "fascista", "comunista", "libertario", "marxista", "conservaor", "progresista",];
let cantidadIdeologias = ideologiaCandidatos.length;
let candidatos = []
let votantes = []
let generarCandidatosUsada = false
let generarVotantesUsada = false

function generarVotantes(_cantidadVotantes) {
    if (generarVotantesUsada) return console.error("Esta función ya se usó")
    if (_cantidadVotantes === undefined || isNaN(parseInt(_cantidadVotantes))) return console.error("Tenés que decirme cuantos votantes querés")
    if (_cantidadVotantes <= 0) return console.error("Se necesita al menos un votante")
    if (_cantidadVotantes > 10000000) return console.error("Máximo diez millones de votantes")

    parseInt(_cantidadVotantes)

    // Asignar votantes
    let id = 1;
    for (i = 0; i < _cantidadVotantes; i++) {
        let votante = new Votante(id, false);
        votantes.push(votante);
        id++;
    }

    generarVotantesUsada = true;
    return console.log(`¡${_cantidadVotantes} votantes generados con éxito!`)
}

function mostrarVotante(_id) {
    if (isNaN(parseInt(_id))) return console.error("Dame un número de votante")
    if (_id <= 0 || _id > votantes.length) throw new Error("No existe ese numero de votante")
    return console.log(votantes[_id - 1]) // Porque el id de los votantes empieza en 1, con lo cual el id n está en votantes[n - 1]
}

function generarCandidatos(_cantidadCandidatos) {
    if (generarCandidatosUsada) return console.error("Esta función ya se usó")
    if (_cantidadCandidatos === undefined || isNaN(parseInt(_cantidadCandidatos))) return console.error("Tenés que decirme cuantos candidatos querés")
    if (_cantidadCandidatos < 1) return console.error("Se necesitan al menos 2 candidatos")
    if (_cantidadCandidatos > cantidadIdeologias) return console.error("No hay tantas ideologias por las que votar");

    // Generar candidatos con ideologías aleatóreas
    let indiceRandom, numObtenidos = [], candidatoRandom, candidatoGenerado;

    for (i = 0; i < _cantidadCandidatos; i++) {
        do {
            indiceRandom = Math.floor(Math.random() * cantidadIdeologias);
        } while (numObtenidos.indexOf(indiceRandom) !== -1)

        candidatoRandom = ideologiaCandidatos[indiceRandom];
        candidatoGenerado = new Candidato(candidatoRandom, 0);
        candidatos.push(candidatoGenerado);
        numObtenidos.push(indiceRandom);
        generarCandidatosUsada = true
    }
    return console.log(`¡${_cantidadCandidatos} candidatos generados con éxito!`)
}

function mostrarCandidato(_num) {
    if (isNaN(parseInt(_num))) return console.error("Dame un número de candidato")
    if (_num <= 0 || _num > candidatos.length) return console.error("No existe ese numero de candidato")
    return console.log(candidatos[_num - 1]) // aca es _num - 1 porque nadie va a pedir los datos del candidato "0"
}

function votar() {
    if (!generarCandidatosUsada && !generarVotantesUsada) return console.error("No hay ni candidatos ni votantes, salame")
    if (!generarCandidatosUsada) return console.error("No hay candidatos")
    if (!generarVotantesUsada) return console.error("No hay votantes")
    if (votantes.length < 0) return console.error("Se necesita al menos 1 votante para votar")
    if (candidatos.length < 2) return console.error("Se necesitan al menos 2 candidatos para votar")

    // Hacer votar a los votantes
    votantes.forEach((votante) => {
        const numRandom = Math.floor(Math.random() * candidatos.length);
        candidatos[numRandom].votosAcumulados += 1;
        votante.yaVoto = true;
    })

    //Buscar ganador {
    let ganador;
    let votosDelGanador = 0;

    candidatos.forEach((candidato) => {
        if (candidato.votosAcumulados > votosDelGanador) {
            votosDelGanador = candidato.votosAcumulados;
            ganador = candidato
        }
    })

    // Si hay desempatantes
    let desempatantes = [];
    candidatos.forEach((desempatante => {
        const values = Object.values(desempatante);
        if (values[1] === votosDelGanador) desempatantes.push(desempatante)
    }))

    // Desempatar:
    const numDesempatantes = desempatantes.length;
    if (numDesempatantes >= 2) {
        desempatantes.forEach((desempatante) => {
            desempatante.participoEnDesempate = true;
            desempatante.ganoEnDesempate = false;
        })
        ganador = desempatantes[Math.floor(Math.random() * numDesempatantes)];
        let indiceDelGanador = candidatos.indexOf(ganador);
        candidatos[indiceDelGanador].ganoEnDesempate = true;
    }

    console.log(candidatos)
    const anuncio = `El ganador es el candidato ${ganador.ideologia} con ${ganador.votosAcumulados} votos`
    return console.log(anuncio)
}

generarCandidatos()
generarVotantes()
votar()
