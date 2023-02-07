const economicProposals = {
    intenciones: [
        "vamos a ",
        "queremos ",
        "planeamos ",
        "pensamos ",
        "buscamos ",
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
        "aportes ",
    ],
    destinatarios: [
        "para los sectores marginados ",
        "para los grandes empresarios ",
        "para los trabajadores ",
        "para los autónomos ",
        "para los emprendedores ",
        "para los sindicalistas ",
        "para los monotributistas ",
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
};

const politicalProposals = {
    intenciones: [
        "Vamos a ",
        "Queremos ",
        "Planeamos ",
        "Pensamos ",
        "Buscamos ",
    ],
    acciones: ["disolver ", "pactar ", "impulsar ", "construir ", "reformar "],
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
};

const socialProposals = {
    intenciones: [
        "Y también vamos a ",
        "También queremos ",
        "Y planeamos ",
        "Para finalizar pensamos ",
        "Y en lo social buscamos ",
    ],
    acciones: ["construir ", "inaugurar ", "mejorar ", "diseñar ", "reformar "],
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
};

const proposals = [economicProposals, politicalProposals, socialProposals];

// function generateProposal(proposals) {
//     let finalSentence = "";
//     for (let i = 0; i < proposals.length; i++) {
//         const typeOfProposal = proposals[i]; // An object
//         const partOfTheProposal = Object.keys(typeOfProposal); // [ "intenciones", "acciones",etc ]

//         for (let j = 0; j < partOfTheProposal.length; j++) {
//             let partsOfText = typeOfProposal[partOfTheProposal[j]]; // ["queremos", "pensamos","planeamos",etc]
//             let randomIndex = Math.floor(Math.random() * partsOfText.length);
//             let text = partsOfText[randomIndex];
//             finalSentence += text;
//         }
//         finalSentence += "</br></br>";
//     }

//     return finalSentence;
// }

// function generateProposal() {
//     let finalSentence = "";
//     for (let i = 0; i < propuestas.length; i++) {
//         let typeOfProposal = propuestas[i];
//         let randomIndex;

//         randomIndex = Math.floor(
//             Math.random() * typeOfProposal.intenciones.length
//         );
//         finalSentence += typeOfProposal.intenciones[randomIndex];

//         randomIndex = Math.floor(Math.random() * typeOfProposal.acciones.length);
//         finalSentence += typeOfProposal.acciones[randomIndex];

//         randomIndex = Math.floor(Math.random() * typeOfProposal.objetos.length);
//         finalSentence += typeOfProposal.objetos[randomIndex];

//         randomIndex = Math.floor(
//             Math.random() * typeOfProposal.destinatarios.length
//         );
//         finalSentence += typeOfProposal.destinatarios[randomIndex];

//         randomIndex = Math.floor(Math.random() * typeOfProposal.conectores.length);
//         finalSentence += typeOfProposal.conectores[randomIndex];

//         randomIndex = Math.floor(Math.random() * typeOfProposal.propositos.length);
//         finalSentence += typeOfProposal.propositos[randomIndex];
//         finalSentence += "\n";
//     }
//     console.log(finalSentence);
// }

// generateProposal()

export { proposals };
