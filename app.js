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
    Candidate.generate(numberOfCandidates.value);
});

formCreateVoters.addEventListener("submit", (event) => {
    event.preventDefault();
    Voter.generate(numberOfVoters.value);
});

formShowCandidate.addEventListener("submit", (event) => {
    event.preventDefault();
    Candidate.introduceOneself(numberOfCandidate.value);
});

formShowVoter.addEventListener("submit", (event) => {
    event.preventDefault();
    Voter.introduceOneself(numberOfVoter.value);
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

    static generate(_numberOfVoters) {
        if (votersGenerated)
            return (votCreatedAnnouncement.innerHTML =
                "Ya se crearon los votantes");

        if (_numberOfVoters === undefined || isNaN(parseInt(_numberOfVoters)))
            return (votCreatedAnnouncement.innerHTML =
                "Tenés que decirme cuántos votantes querés");

        if (_numberOfVoters <= 0)
            return (votCreatedAnnouncement.innerHTML =
                "Se necesita al menos un votante");

        if (_numberOfVoters > 10000)
            return (votCreatedAnnouncement.innerHTML =
                "Máximo 10.000 votantes");

        votCreatedAnnouncement.innerHTML = "";

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

    static introduceOneself(_numberOfVoter) {
        if (!votersGenerated) return (message.innerHTML = "No hay votantes");

        if (!_numberOfVoter)
            return (message.innerHTML = "Dame un número de votante");

        if (_numberOfVoter <= 0 || _numberOfVoter > voters.length)
            return (message.innerHTML = "No existe ese número de votante");

        const voter = voters[_numberOfVoter - 1];
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

    static generate(_numberOfCandidates) {
        if (candidatesGenerated)
            return (candCreatedAnnouncement.innerHTML =
                "Ya se crearon los candidatos");

        if (!_numberOfCandidates || isNaN(_numberOfCandidates))
            return (candCreatedAnnouncement.innerHTML =
                "Tenés que decirme cuántos candidatos querés");

        if (_numberOfCandidates < 2)
            return (candCreatedAnnouncement.innerHTML =
                "Se necesitan al menos 2 candidatos");

        if (_numberOfCandidates > ideologiesLength)
            return (candCreatedAnnouncement.innerHTML =
                "Sólo hay 10 ideologías por las que votar");

        candCreatedAnnouncement.innerHTML = "";

        // Generate candidates with random ideologies
        let randomIndex;
        let indicesObtained = {};
        let randomIdeology;
        let generatedCandidate;

        // We look for an ideology for each candidate without repeating them
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

    static introduceOneself(_numberOfCandidate) {
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

// Function to disable and enable buttons while counting votes
// This is to avoid conflicts with asynchronous code
function changeButtonsState() {
    buttons.forEach((button) => button.toggleAttribute("disabled", voting));
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

    counting = setTimeout(() => (msg.innerHTML = "Contando votos..."), 0);

    // Make voters vote
    voters.forEach((votante) => {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        candidates[randomIndex].votesReceived += 1;
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
    });

    // Break the tie:
    if (tiedCandidates.length >= 2) {
        let tieAnnouncement = "Hubo un empate. Vamos a desempatar entre: ";

        tiedCandidates.forEach((candidate) => {
            tieAnnouncement += `<br> - ${candidate.name} ${candidate.lastName} (${candidate.ideology})`;
        });

        let tieAnnouncementTime = 3000;

        showDraw = setTimeout(() => {
            message.innerHTML = tieAnnouncement;
            window.scrollBy(0, 1000);
        }, tieAnnouncementTime);

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
}

function reset() {
    voting = false;
    changeButtonsState();
    clearTimeout(counting);
    clearTimeout(expectWinner);
    clearTimeout(showDraw);
    clearTimeout(voteReturn);
    message.innerHTML = "";
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
