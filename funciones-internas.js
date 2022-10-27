function inventarSustProp() {
    const MIN_NUMBER = 3;
    const MAX_NUMBER = 7;
    // Cantidad de caracteres que va a tener el sustantivo propio
    const numLetras = Math.round(
        Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER
    );
    const vocales = ["a", "e", "i", "o", "u"];
    const consonantes = [
        "b",
        "c",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
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

// Creamos dnis de 8 dígitos (desde 10 millones a 99.999.999)
// Establecemos la cantidad máxima posible de distintos dni
export const MAX_DNI_POSIBLES = 89999999;
export let llamadasAInventarDNI = 0;
export let dniCreados = [];
// Variable que va acontener los dni creados para que no se repitan

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

export { inventarSustProp, inventarDNI };
