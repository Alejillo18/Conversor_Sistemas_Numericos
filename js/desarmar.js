export function desarmar(valor) {
    let entero = '';
    let decimal = '';
    let encontroComa = false;

    for (let char of valor) {
        if (char === ",") {
            encontroComa = true;
            continue;
        }

        if (encontroComa) {
            decimal += char;
        } else {
            entero += char;
        }
    }

    return {
        entero,
        decimal
    };
}