export function desarmar(valor) {
    let entero = [];
    let decimal = [];
    let coma = false;

    for (let char of valor) {
        if (char === ",") {
            coma = true;
            continue;
        }

        if (coma) {
            decimal.push(parseInt(char));
        } else {
            entero.push(parseInt(char));
        }
    }

    return {
        entero,
        decimal
    };
}