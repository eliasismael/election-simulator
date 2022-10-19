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

const propuestas = {
    propuestasEconomicas: {
        intenciones: [
            "Vamos a ",
            "Queremos ",
            "Planeamos ",
            "Pensamos ",
            "Buscamos ",
        ],
        acciones: [
            "aumentar ",
            "reducir ",
            "eliminar ",
            "crear nuevos ",
            "reforzar ",
        ],
        objetos: [
            "impuestos ",
            "bonos ",
            "subsidios ",
            "planes sociales ",
            "aportes",
        ],
        destinatarios: [
            "para los sectores marginados ",
            "para los grandes empresarios ",
            "para los trabajadores ",
            "para los autónomos ",
            "para los emprendedores ",
            "para los sindicalistas",
            "para los monotributistas",
        ],
        conectores: [
            "para ",
            "con la intención de ",
            "para así ",
            "en post de ",
            "con el objetivo de ",
            "para poder ",
            "en vista de ",
        ],
        propositos: [
            "fomentar la inversión.",
            "evitar el desempleo.",
            "luchar contra la pobreza.",
            "bajar la inflación.",
            "impulsar el desarrollo.",
            "fortalecer la industria nacional.",
        ],
    },

    propuestasPoliticas: {
        intenciones: [
            "Vamos a ",
            "Queremos ",
            "Planeamos ",
            "Pensamos ",
            "Buscamos ",
        ],
        acciones: [
            "disolver ",
            "pactar ",
            "impulsar ",
            "construir ",
            "reformar ",
        ],
        objetos: [
            "la cámara ",
            "el ministerio ",
            "la secretaría ",
            "la subsecretaría ",
        ],
        destinatarios: [
            "de diputados ",
            "de senadores ",
            "de ministros ",
            "de jueces ",
            "de legisladores ",
        ],
        conectores: [
            "para ",
            "con la intención de ",
            "para así ",
            "en post de ",
            "con el objetivo de ",
            "para poder ",
            "en vista de ",
        ],
        propositos: [
            "tener más democracia.",
            "estar mejor representados.",
            "tener mayor participacion popular.",
            "luchar contra la corrupción.",
            "descentralizar el poder.",
        ],
    },

    propuestasSociales: {
        intenciones: [
            "Vamos a ",
            "Queremos ",
            "Planeamos ",
            "Pensamos ",
            "Buscamos ",
        ],
        acciones: [
            "construir ",
            "inaugurar ",
            "mejorar ",
            "diseñar ",
            "reformar ",
        ],
        objetos: [
            "hospitales ",
            "universidades ",
            "museos ",
            "centros culturales ",
            "espacios verdes ",
            "espacios recreacionales ",
        ],
        destinatarios: [
            "en los barrios humildes ",
            "en las grandes ciudades ",
            "en la zonas urbanas ",
            "en las zonas rurales ",
            "en los pueblos aislados ",
        ],
        conectores: [
            "para ",
            "con la intención de ",
            "para así ",
            "en post de ",
            "con el objetivo de ",
            "para poder ",
            "en vista de ",
        ],
        propositos: [
            "fomentar el turismo.",
            "expandir la cultura.",
            "acercar posibilidades.",
            "brindar oportunidades.",
            "garantizar servicios.",
            "tener una sociedad más inclusiva.",
        ],
    },
};

let candidatos = [];
let votantes = [];

let dniCreados = [];
// Variable que va acontener los dni creados para que no se repitan

// Solo se podrán crear candidatos y votantes una vez
let generarCandidatosUsada = false;
let generarVotantesUsada = false;

// Creamos dnis de 8 dígitos (desde 10 millones a 99.999.999)
// Establecemos la cantidad máxima posible de distintos dni
const MAX_DNI_POSIBLES = 89999999;
let llamadasAInventarDNI = 0;

function inventarSustProp() {
    const MIN_NUMBER = 3;
    const MAX_NUMBER = 9;
    // Cantidad de caracteres que va a tener el sustantivo propio
    const numLetras = Math.round(
        Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
    );
    const vocales = ["a", "e", "i", "o", "u"];
    const consonantes = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
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

function inventarDNI() {
    if (llamadasAInventarDNI === MAX_DNI_POSIBLES) {
        return "No se pueden crear más dni";
    }

    llamadasAInventarDNI++;

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

    return dni;
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

    let propuestaFinal = ecoFinal + " " + polFinal + " " + socFinal;
    return propuestaFinal;
}

function generarVotantes(_cantidadVotantes) {
    if (generarVotantesUsada) {
        return console.error("Esta función ya se usó");
    }
    if (
        _cantidadVotantes === undefined || 
        isNaN(parseInt(_cantidadVotantes))
    ) {
        return console.error("Tenés que decirme cuantos votantes querés");
    }
    if (_cantidadVotantes <= 0) {
        return console.error("Se necesita al menos un votante");
    }
    if (_cantidadVotantes > MAX_DNI_POSIBLES) {
        return console.error("Máximo 89.999.999 votantes");
    }

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
    return console.log(anuncio);
}

function generarCandidatos(_cantidadCandidatos) {
    if (generarCandidatosUsada) {
        return console.error("Esta función ya se usó");
    }
    if (
        _cantidadCandidatos === undefined ||
        isNaN(parseInt(_cantidadCandidatos))
    ) {
        return console.error("Tenés que decirme cuantos candidatos querés");
    }
    if (_cantidadCandidatos < 1) {
        return console.error("Se necesitan al menos 2 candidatos");
    }
    if (_cantidadCandidatos > cantidadIdeologias) {
        return console.error("No hay tantas ideologias por las que votar");
    }

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
    return console.log(anuncio);
}

function mostrarVotante(_id) {
    if (isNaN(parseInt(_id))) {
        return console.error("Dame un número de votante");
    }
    if (_id <= 0 || _id > votantes.length) {
        return console.error("No existe ese numero de votante");
    }

    const votante = votantes[_id - 1];
    const presentacion = `Soy ${votante.Nombre} ${votante.Apellido}, mi dni es ${votante.DNI} y soy de la ciudad de ${votante.Ciudad}.`;
    return presentacion;
}

function mostrarCandidato(_num) {
    if (isNaN(parseInt(_num))) {
        return console.error("Dame un número de candidato");
    }
    if (_num <= 0 || _num > candidatos.length) {
        return console.error("No existe ese numero de candidato");
    }

    let candidato = candidatos[_num - 1];
    return console.log(candidato);
}

function votar() {
    if (!generarCandidatosUsada && !generarVotantesUsada) {
        return console.error("No hay ni candidatos ni votantes");
    }
    if (!generarCandidatosUsada) {
        return console.error("No hay candidatos");
    }
    if (!generarVotantesUsada) {
        return console.error("No hay votantes");
    }
    if (votantes.length < 0) {
        return console.error("Se necesita al menos 1 votante para votar");
    }
    if (candidatos.length < 2) {
        return console.error("Se necesitan al menos 2 candidatos para votar");
    }

    // Hacer votar a los votantes
    votantes.forEach((votante) => {
        const numRandom = Math.floor(Math.random() * candidatos.length);
        candidatos[numRandom].votosAcumulados += 1;
        votante.yaVoto = true;
    });

    //Buscar ganador {
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

    // Desempatar:
    let numDesempatantes = desempatantes.length;
    if (numDesempatantes >= 2) {
        let anuncioEmpate = ["Hubo un empate. Vamos a desempatar entre:\n"

        desempatantes.forEach((desempatante) => {
            desempatante.participoEnDesempate = true;
            desempatante.ganoEnDesempate = false;
            anuncioEmpate.push(
                "-" + desempatante.nombre + " " + desempatante.apellido + "\n"
            );
        });
        
        anuncioEmpate = anuncioEmpate.toString().split(",").join("");
        console.log(anuncioEmpate);

        let numGanador = Math.floor(Math.random() * numDesempatantes);
        ganador = desempatantes[numGanador];
        ganador.ganoEnDesempate = true;
        huboEmpate = true;
    }

    return huboEmpate
        ? console.log(
              `El ganador es el candidato ${ganador.ideologia} ${ganador.nombre} ${ganador.apellido}`
          )
        : console.log(
              `El ganador es el candidato ${ganador.ideologia} ${ganador.nombre} ${ganador.apellido} con ${ganador.votosAcumulados} votos`
          );
}

/* Ejecutar:
generarCandidatos(n);
generarVotantes(m);
votar(); */ 
