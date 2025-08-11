export function desarmar(valor) {
    let entero = [];
    let decimal = [];
    let encontroComa = false;
    let separador = valor.includes(",") ? "," : valor.includes(".") ? "." : null;

    if (separador) {
        [entero, decimal] = valor.split(separador);
        return {
            entero: entero,
            decimal: decimal || ""
        };
    }

    return {
        entero: valor,
        decimal: ""
    };
}