import { proposals } from "./proposals.js";
import {
    inventProperNoun,
    generateDNIsrc,
    generateProposal,
} from "./functions.js";

// Botones para crear candidatos y votantes
const numberOfCandidates = document.getElementById("cantCandidatos");
const numberOfVoters = document.getElementById("cantVotantes");

// Formularios para cada boton
const formCreateCandidate = document.getElementById("formCandidatos");
const formCreateVoters = document.getElementById("formVotantes");
const formShowCandidate = document.getElementById("formMostrarCandidato");
const formShowVoter = document.getElementById("formMostrarVotante");

// Textos para anunciar la creación de candidatos y votantes
const candCreatedAnnouncement = document.getElementById("anuncioCandGenerados");
const votCreatedAnnouncement = document.getElementById("anuncioVotGenerados");

const btnVote = document.getElementById("votar");
const btnReset = document.getElementById("reset");

// Valor de los input
const numberOfCandidate = document.getElementById("numCandidato");
const numberOfVoter = document.getElementById("numVotante");

// What the program returns
const message = document.getElementById("msg");

const buttons = document.querySelectorAll(".boton");

// Variables to be initialized and used as arguments when the necessary inputs are filled
let _numberOfCandidates;
let _numberOfVoters;
let _numberOfCandidate;
let _numberOfVoter;

const ideologies = [
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

const ideologiesLength = ideologies.length;

let candidates = [];
let voters = [];

// Candidates and voters can only be created once
let candidatesGenerated = false;
let votersGenerated = false;
let voteFunctionUsed = false;
let voting = false;

// Variables to be able to stop the asynchronous code of the "vote" function.
let counting;
let expectWinner;
let showDraw;
let voteReturn;

formCreateCandidate.addEventListener("submit", (event) => {
    event.preventDefault();
    _numberOfCandidates = parseInt(numberOfCandidates.value);
    Candidate.generar(_numberOfCandidates);
});

formCreateVoters.addEventListener("submit", (event) => {
    event.preventDefault();
    _numberOfVoters = parseInt(numberOfVoters.value);
    Voter.generar(_numberOfVoters);
});

formShowCandidate.addEventListener("submit", (event) => {
    event.preventDefault();
    _numberOfCandidate = numberOfCandidate.value;
    Candidate.presentarse(_numberOfCandidate);
});

formShowVoter.addEventListener("submit", (event) => {
    event.preventDefault();
    _numberOfVoter = numberOfVoter.value;
    Voter.presentarse(_numberOfVoter);
});

btnVote.addEventListener("click", vote);
btnReset.addEventListener("click", reset);

class Voter {
    constructor(name, lastName, dni, city, id) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.city = city;
        this.id = id;
    }

    static generar(_numberOfVoters) {
        if (votersGenerated)
            return (message.innerHTML = "Ya se crearon los votantes");

        if (_numberOfVoters === undefined || isNaN(parseInt(_numberOfVoters)))
            return (message.innerHTML =
                "Tenés que decirme cuántos votantes querés");

        if (_numberOfVoters <= 0)
            return (message.innerHTML = "Se necesita al menos un votante");

        if (_numberOfVoters > 10000)
            return (message.innerHTML = "Máximo 10.000 votantes");

        message.innerHTML = "";

        let id = 1;
        for (let i = 0; i < _numberOfVoters; i++) {
            let voter = new Voter(
                inventProperNoun(),
                inventProperNoun(),
                generateDNIsrc.generateDNI(),
                inventProperNoun(),
                id
            );

            voters.push(voter);
            id++;
        }

        votersGenerated = true;
        votCreatedAnnouncement.innerHTML = `¡${_numberOfVoters} votantes generados con éxito!`;
    }

    static presentarse(_numberOfCandidate) {
        if (!votersGenerated) return (message.innerHTML = "No hay votantes");

        if (isNaN(_numberOfCandidate))
            return (message.innerHTML = "Dame un número de votante");

        if (_numberOfCandidate <= 0 || _numberOfCandidate > voters.length)
            return (message.innerHTML = "No existe ese número de votante");

        const voter = voters[_numberOfCandidate - 1];
        message.innerHTML = `Soy ${voter.name} ${voter.lastName}, mi dni es ${voter.dni} y soy de la ciudad de ${voter.city}.`;
    }
}

class Candidate {
    constructor(name, lastName, ideology, proposals, votesReceived) {
        this.name = name;
        this.lastName = lastName;
        this.ideology = ideology;
        this.proposals = proposals;
        this.votesReceived = votesReceived;
    }

    static generar(_numberOfCandidates) {
        if (candidatesGenerated)
            return (message.innerHTML = "Ya se crearon los candidatos");

        if (!_numberOfCandidates || isNaN(_numberOfCandidates))
            return (message.innerHTML =
                "Tenés que decirme cuántos candidatos querés");

        if (_numberOfCandidates < 2)
            return (message.innerHTML = "Se necesitan al menos 2 candidatos");

        if (_numberOfCandidates > ideologiesLength)
            return (message.innerHTML =
                "No hay tantas ideologías por las que votar");

        message.innerHTML = "";

        // Generar candidatos con ideologías aleatóreas
        let randomIndex;
        let indicesObtained = {};
        let randomIdeology;
        let generatedCandidate;

        // Buscamos una ideología para cada candidato sin que se repitan
        for (let i = 0; i < _numberOfCandidates; i++) {
            do {
                randomIndex = Math.floor(Math.random() * ideologiesLength);
            } while (indicesObtained[randomIndex]);

            indicesObtained[randomIndex] = true;
            randomIdeology = ideologies[randomIndex];

            generatedCandidate = new Candidate(
                inventProperNoun(),
                inventProperNoun(),
                randomIdeology,
                generateProposal(proposals),
                0
            );

            candidates.push(generatedCandidate);
        }

        candidatesGenerated = true;
        candCreatedAnnouncement.innerHTML = `¡${_numberOfCandidates} candidatos generados con éxito!`;
    }

    static presentarse(_numberOfCandidate) {
        if (!candidatesGenerated)
            return (message.innerHTML = "No hay candidatos");

        if (isNaN(_numberOfCandidate))
            return (message.innerHTML = "Dame un número de candidato");

        if (_numberOfCandidate <= 0 || _numberOfCandidate > candidates.length)
            return (message.innerHTML = "No existe ese número de candidato");

        const candidate = candidates[_numberOfCandidate - 1];

        message.innerHTML = `Soy ${candidate.name} ${candidate.lastName}, el candidato representante del partido ${candidate.ideology}. <br><br> Nosotros ${candidate.proposals}`;

        window.scrollBy(0, 1000);
    }
}

// // Creamos dnis de 8 dígitos y establecemos la cantidad máxima posible
// const MAX_DNI_POSIBLES = 100000000;
// let numberOfDniCreated = 0;
// let dniCreated = new Set();

// function generateDNI() {
//     if (numberOfDniCreated === MAX_DNI_POSIBLES) return;

//     const DIGITOS_DNI = 8;
//     const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//     const cantNums = nums.length;
//     let dni;
//     let num;

//     // CREAR DNIs ÚNICOS E IRREPETIBLES:
//     do {
//         dni = "";

//         for (let i = 0; i < DIGITOS_DNI; i++) {
//             num = Math.floor(Math.random() * cantNums);
//             dni += num;
//         }

//         while (dni[0] === "0") {
//             dni = dni.substring(1);
//         }

//         // Añadir puntos cada 3 numeros empezando desde el final

//         dni = dni.split("").reverse().join("");
//         dni = dni.replace(/(\d{3})(?!$)/g, "$1.");
//         dni = dni.split("").reverse().join("");

//         // Si este dni ya se obtuvo repetir el proceso
//     } while (dniCreated.has(dni));

//     dniCreated.add(dni);
//     numberOfDniCreated++;
//     return dni;
// }

// function inventProperNoun() {
//     const MIN_NUM = 3;
//     const MAX_NUM = 7;
//     const nameLength = Math.round(
//         Math.random() * (MAX_NUM - MIN_NUM) + MIN_NUM
//     );
//     const vowels = ["a", "e", "i", "o", "u"];
//     const consonants = [
//         "b",
//         "c",
//         "d",
//         "f",
//         "g",
//         "h",
//         "j",
//         "k",
//         "l",
//         "m",
//         "n",
//         "ñ",
//         "p",
//         "q",
//         "r",
//         "s",
//         "t",
//         "v",
//         "w",
//         "x",
//         "y",
//         "z",
//     ];
//     const vowelsLength = vowels.length;
//     const consonantsLength = consonants.length;
//     let properNoun = "";

//     // We set a variable to determine if the current iteration will take a consonant or a vowel
//     let takeVowel = Boolean(Math.round(Math.random()));
//     let letter;

//     for (let i = 0; i < nameLength; i++) {
//         letter = takeVowel
//             ? vowels[Math.floor(Math.random() * vowelsLength)]
//             : consonants[Math.floor(Math.random() * consonantsLength)];

//         // GRAMMAR RULES FOR Q AND G
//         switch (letter) {
//             case "q":
//                 // If there is space for two more letters after the "q".
//                 if (i + 2 < nameLength) {
//                     const eOrI = ["e", "i"];
//                     letter = "qu" + eOrI[Math.round(Math.random())];

//                     // To avoid putting "quii" or "quee" we put a consonant after it:
//                     takeVowel = !takeVowel;

//                     /* To jump to the corresponding position after adding additional letters in the same iteration.
//                         we add 3 letters but we do 2 increments because the missing one is done by the for loop automatically.*/
//                     i += 2;
//                 } else if (i + 2 === nameLength) {
//                     // If there is only one more letter, we look for another consonant.
//                     while (letter === "q") {
//                         letter =
//                             consonants[
//                                 Math.floor(Math.random() * consonantsLength)
//                             ];
//                     }
//                 }
//                 break;

//             case "e":
//             case "i":
//                 if (properNoun[i - 1] === "g" && i + 1 < nameLength) {
//                     let addU = Boolean(Math.round(Math.random()));
//                     if (addU) {
//                         let diaeresis = Boolean(Math.round(Math.random()));
//                         letter = diaeresis ? "ü" + letter : "u" + letter;
//                         takeVowel = !takeVowel;
//                         i++;
//                     }
//                 }
//                 break;
//         }
//         takeVowel = !takeVowel;
//         properNoun += letter;
//     }

//     // Evitar terminaciones raras
//     const lastLetter = properNoun[properNoun.length - 1];
//     switch (lastLetter) {
//         case "ñ":
//         case "w":
//         case "h":
//         case "q":
//             let newLastLetter;
//             do {
//                 newLastLetter =
//                     consonants[Math.floor(Math.random()) * consonantsLength];
//             } while (
//                 newLastLetter === "ñ" ||
//                 newLastLetter === "w" ||
//                 newLastLetter === "h" ||
//                 newLastLetter === "q"
//             );

//             properNoun = properNoun.slice(0, properNoun.length - 1);
//             properNoun += newLastLetter;
//             break;
//     }

//     // First capital letter
//     const firstLetter = properNoun.slice(0, 1).toUpperCase();
//     properNoun = firstLetter + properNoun.substring(1);
//     return properNoun;
// }

// Function to disable and enable buttons while counting votes
// This is to avoid conflicts with asynchronous code
function changeButtonsState() {
    if (voting) {
        for (const button of buttons) {
            button.setAttribute("disabled", "");
        }
    } else {
        for (const button of buttons) {
            button.removeAttribute("disabled");
        }
    }
}

function vote() {
    if (voteFunctionUsed)
        return (message.innerHTML = "Ya se votó. Inicia una nueva votación.");

    if (!candidatesGenerated && !votersGenerated)
        return (message.innerHTML = "No hay ni candidatos ni votantes");

    if (!candidatesGenerated) return (message.innerHTML = "No hay candidatos");

    if (!votersGenerated) return (message.innerHTML = "No hay votantes");

    if (voters.length < 0)
        return (message.innerHTML =
            "Se necesita al menos un votante para votar");

    if (candidates.length < 2)
        return (message.innerHTML =
            "Se necesitan al menos 2 candidatos para votar");

    voting = true;
    changeButtonsState();

    voteFunctionUsed = true;

    // message.innerHTML = "Contando votos...";
    counting = setTimeout(() => (msg.innerHTML = "Contando votos..."), 0);
    // msg.innerHTML = counting;

    // Make voters vote
    voters.forEach((votante) => {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        candidates[randomIndex].votesReceived += 1;
        votante.hasVoted = true;
    });

    // Search for winner
    let winner;
    let votesOfTheWinner = 0;

    candidates.forEach((candidate) => {
        if (candidate.votesReceived > votesOfTheWinner) {
            votesOfTheWinner = candidate.votesReceived;
            winner = candidate;
        }
    });

    // See if there is a tie
    let tie = false;
    let tiedCandidates = [];

    candidates.forEach((candidate) => {
        if (candidate.votesReceived === votesOfTheWinner) {
            tiedCandidates.push(candidate);
        }

        // const values = Object.values(candidate);
        // // 4 es el índice del valor de la propiedad "votesReceived" en el array "values"
        // if (values[4] === votesOfTheWinner) tiedCandidates.push(candidate);
    });

    // Break the tie:
    if (tiedCandidates.length >= 2) {
        let tieAnnouncement = "Hubo un empate. Vamos a desempatar entre: ";

        tiedCandidates.forEach((candidate) => {
            // candidate.participoEnDesempate = true;
            // candidate.ganoEnDesempate = false;
            tieAnnouncement += `<br> - ${candidate.name} ${candidate.lastName} (${candidate.ideology})`;
        });

        let tieAnnouncementTime = 3000;

        showDraw = setTimeout(() => {
            message.innerHTML = tieAnnouncement;
            window.scrollBy(0, 1000);
        }, tieAnnouncementTime);

        // message.innerHTML = showDraw;

        let winnerIndex = Math.floor(Math.random() * tiedCandidates.length);
        winner = tiedCandidates[winnerIndex];
        tie = true;
    }

    // If there was a tie, it will take longer for the announcement of the winner to appear
    let time = tie ? 6000 : 3000;

    expectWinner = setTimeout(
        () => (message.innerHTML += "<br>" + "Y el ganador es..."),
        time
    );

    // message.innerHTML = expectWinner;

    // Also increase the final announcement time depending on whether the previous time was extended or not
    let time2 = tie ? 9000 : 6000;
    console.log(winner);
    voteReturn = setTimeout(() => {
        voting = false;
        changeButtonsState();
        message.innerHTML = tie
            ? `El ganador es el candidato ${winner.ideology} ${winner.name} ${winner.lastName}`
            : `El ganador es el candidato ${winner.ideology} ${winner.name} ${winner.lastName} con ${winner.votesReceived} votos`;
        window.scrollBy(0, 1000);
    }, time2);

    // if (tie) {
    //     return1 = setTimeout(() => {
    //         voting = false;
    //         changeButtonsState();
    //         message.innerHTML = `El ganador es el candidato ${winner.ideologia} ${winner.nombre} ${winner.apellido}`;
    //         window.scrollBy(0, 1000);
    //     }, time2);
    // } else {
    //     return2 = setTimeout(() => {
    //         voting = false;
    //         changeButtonsState();
    //         message.innerHTML = `El ganador es el candidato ${winner.ideologia} ${winner.nombre} ${winner.apellido} con ${winner.votesReceived} votos`;
    //         window.scrollBy(0, 1000);
    //     }, time2);
    // }
}

function reset() {
    voting = false;
    changeButtonsState();
    clearTimeout(counting);
    clearTimeout(expectWinner);
    clearTimeout(showDraw);
    clearTimeout(voteReturn);

    message.innerHTML = "";
    _numberOfCandidates = undefined;
    _numberOfVoters = undefined;
    candidatesGenerated = false;
    votersGenerated = false;
    voteFunctionUsed = false;
    candCreatedAnnouncement.innerHTML = "";
    votCreatedAnnouncement.innerHTML = "";
    candidates.length = 0;
    voters.length = 0;
    numberOfCandidates.value = "";
    numberOfVoters.value = "";
    numberOfCandidate.value = "";
    numberOfVoter.value = "";
}
