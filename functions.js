function inventProperNoun() {
    const MIN_NUM = 3;
    const MAX_NUM = 7;
    const nameLength = Math.round(Math.random() * (MAX_NUM - MIN_NUM) + MIN_NUM);
    const vowels = ["a", "e", "i", "o", "u"];
    const consonants = ["b","c","d","f","g","h","j","k","l","m","n","ñ","p","q","r","s","t","v","w","x","y","z"];
    const vowelsLength = vowels.length;
    const consonantsLength = consonants.length;
    let properNoun = "";

    // We set a variable to determine if the current iteration will take a consonant or a vowel
    let takeVowel = Boolean(Math.round(Math.random()));
    let letter;

    for (let i = 0; i < nameLength; i++) {
        letter = takeVowel
            ? vowels[Math.floor(Math.random() * vowelsLength)]
            : consonants[Math.floor(Math.random() * consonantsLength)];

        // GRAMMAR RULES FOR Q AND G
        switch (letter) {
            case "q":

                // If there is space for two more letters after the "q"
                if (i + 2 < nameLength) {
                    const eOrI = ["e", "i"];
                    letter = "qu" + eOrI[Math.round(Math.random())];

                    // To avoid putting "quii" or "quee" we put a consonant after it:
                    takeVowel = !takeVowel;

                    /* To jump to the corresponding position after adding additional letters in the same iteration.
                        we add 3 letters but we do 2 increments because the missing one is done by the for loop automatically.*/
                    i += 2;

                } else if (i + 2 === nameLength) {
                    // If there is only one more letter, we look for another consonant

                    while (letter === "q") {
                        letter =  consonants[Math.floor(Math.random() * consonantsLength)];
                    }
                }

                break;

            case "e":
            case "i":
                if (properNoun[i - 1] === "g" && i + 1 < nameLength) {
                    let addU = Boolean(Math.round(Math.random()));
                    if (addU) {
                        let diaeresis = Boolean(Math.round(Math.random()));
                        letter = diaeresis ? "ü" + letter : "u" + letter;
                        takeVowel = !takeVowel;
                        i++;
                    }
                }

                break;
        }

        takeVowel = !takeVowel;
        properNoun += letter;
    }

    // Avoid weird endings
    const lastLetter = properNoun[properNoun.length - 1];
    switch (lastLetter) {
        case "ñ":
        case "w":
        case "h":
        case "q":
            let newLastLetter;
            do {
                newLastLetter =
                    consonants[Math.floor(Math.random()) * consonantsLength];
            } while (
                newLastLetter === "ñ" ||
                newLastLetter === "w" ||
                newLastLetter === "h" ||
                newLastLetter === "q"
            );

            properNoun = properNoun.slice(0, properNoun.length - 1);
            properNoun += newLastLetter;
            break;
    }

    // First capital letter
    const firstLetter = properNoun.slice(0, 1).toUpperCase();
    properNoun = firstLetter + properNoun.substring(1);
    return properNoun;
}

const MAX_DNIS = 100000000;
let numberOfDniCreated = 0;
let dniCreated = new Set();

function generateDNI() {
    if (numberOfDniCreated === MAX_DNIS) return;

    const DIGITOS_DNI = 8;
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const cantNums = nums.length;
    let dni;
    let num;

    // CREATE UNIQUE AND UNREPEATABLE DNIS:
    do {
        dni = "";

        for (let i = 0; i < DIGITOS_DNI; i++) {
            num = Math.floor(Math.random() * cantNums);
            dni += num;
        }

        while (dni[0] === "0") {
            dni = dni.substring(1);
        }

        // Add points every 3 numbers starting from the end
        dni = dni.split("").reverse().join("");
        dni = dni.replace(/(\d{3})(?!$)/g, "$1.");
        dni = dni.split("").reverse().join("");

        // If this DNI has already been obtained, repeat the process
    } while (dniCreated.has(dni));

    dniCreated.add(dni);
    numberOfDniCreated++;
    return dni;
}

function generateProposal(proposals) {
    let finalSentence = "";
    for (let i = 0; i < proposals.length; i++) {
        const typeOfProposal = proposals[i]; // An object
        const partOfTheProposal = Object.keys(typeOfProposal); // [ "intenciones", "acciones", etc ]

        for (let j = 0; j < partOfTheProposal.length; j++) {
            let partsOfText = typeOfProposal[partOfTheProposal[j]]; // ["queremos", "pensamos", "planeamos", etc]
            let randomIndex = Math.floor(Math.random() * partsOfText.length);
            let text = partsOfText[randomIndex];
            finalSentence += text;
        }

        finalSentence += "</br></br>";
    }

    return finalSentence;
}

const generateDNIsrc = {
    MAX_DNIS: MAX_DNIS,
    numberOfDniCreated: numberOfDniCreated,
    dniCreated: dniCreated,
    generateDNI: generateDNI,
};

export { inventProperNoun, generateDNIsrc, generateProposal };
