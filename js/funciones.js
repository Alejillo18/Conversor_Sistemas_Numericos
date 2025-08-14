import { cambiarLetraAnumero, cambiarNumeroALetra } from "/Conversor_Sistemas_Numericos/CambiarLetraANumero.js";

const inversion = {
    "1": "0",
    "0": "1"
};

// Funciones para conversión de partes decimales
function convertirDecimalBinADecimal(decimal) {
    let nroBinDecimal = 0;
    for (let i = 0; i < decimal.length; i++) {
        nroBinDecimal += parseInt(decimal[i]) * (2 ** -(i + 1));
    }
    return nroBinDecimal;
}

function convertirOctalDecimalADecimal(decimal) {
    let nroOctDecimal = 0;
    for (let i = 0; i < decimal.length; i++) {
        nroOctDecimal += parseInt(decimal[i]) * (8 ** -(i + 1));
    }
    return nroOctDecimal;
}

function convertirHexDecimalADecimal(decimal) {
    let nroHexDecimal = 0;
    for (let i = 0; i < decimal.length; i++) {
        let caracter = decimal[i].toUpperCase();
        let nro = isNaN(caracter) ? cambiarLetraAnumero(caracter) : parseInt(caracter);
        nroHexDecimal += nro * (16 ** -(i + 1));
    }
    return nroHexDecimal;
}

function convertirDecimalDecABin(decimal) {
    let nro = parseFloat("0." + decimal);
    let precision = 20;
    let resultado = [];
    while (precision > 0 && nro > 0) {
        nro *= 2;
        let bit = Math.floor(nro);
        resultado.push(bit);
        nro -= bit;
        precision--;
    }
    return resultado.join("") || "0";
}

function convertirDecimalDecAOctal(decimal) {
    let nro = parseFloat("0." + decimal);
    let precision = 10;
    let resultado = [];
    while (precision > 0 && nro > 0) {
        nro *= 8;
        let digit = Math.floor(nro);
        resultado.push(digit);
        nro -= digit;
        precision--;
    }
    return resultado.join("") || "0";
}

function convertirDecimalDecAHex(decimal) {
    let nro = parseFloat("0." + decimal);
    let precision = 8;
    let resultado = [];
    while (precision > 0 && nro > 0) {
        nro *= 16;
        let digit = Math.floor(nro);
        if (digit > 9) digit = cambiarNumeroALetra(digit);
        resultado.push(digit);
        nro -= Math.floor(nro);
        precision--;
    }
    return resultado.join("") || "0";
}

// Funciones principales de conversión
export function convertirBinADec(entero, decimal) {
    let nroBinEntero = 0;
    let nroBinDecimal = 0;
    let indice = entero.length - 1;
    for (let i = 0; i < entero.length; i++) {
        nroBinEntero += (parseInt(entero[i])) * 2 ** indice;
        indice -= 1;
    }
    if (decimal && decimal.length > 0) {
        nroBinDecimal = convertirDecimalBinADecimal(decimal);
    }
    return (nroBinEntero + nroBinDecimal).toString().replace(".", ",");
}

export function convertirBinAOctal(entero, decimal) {
    while (entero.length % 3 !== 0) entero = "0" + entero;
    let grupos = [];
    for (let i = 0; i < entero.length; i += 3) {
        grupos.push(entero.slice(i, i + 3));
    }
    let solucion = [];
    let bandera = false;
    for (let sub of grupos) {
        let valor = parseInt(convertirBinADec(sub, ""));
        if (valor !== 0 || bandera) {
            solucion.push(valor);
            bandera = true;
        }
    }
    let resultado = solucion.join("") || "0";
    if (decimal && decimal.length > 0) {
        while (decimal.length % 3 !== 0) decimal += "0";
        let gruposDec = [];
        for (let i = 0; i < decimal.length; i += 3) {
            gruposDec.push(decimal.slice(i, i + 3));
        }
        let decRes = gruposDec.map(sub => parseInt(convertirBinADec(sub, "")));
        resultado += "," + decRes.join("");
    }
    return resultado;
}

export function convertirBinAHex(entero, decimal) {
    while (entero.length % 4 !== 0) entero = "0" + entero;
    let grupos = [];
    for (let i = 0; i < entero.length; i += 4) {
        grupos.push(entero.slice(i, i + 4));
    }
    let solucion = [];
    let bandera = false;
    for (let sub of grupos) {
        let valor = parseInt(convertirBinADec(sub, ""));
        let digito = valor >= 10 ? cambiarNumeroALetra(valor) : valor.toString();
        if (valor !== 0 || bandera) {
            solucion.push(digito);
            bandera = true;
        }
    }
    let resultado = solucion.join("") || "0";
    if (decimal && decimal.length > 0) {
        while (decimal.length % 4 !== 0) decimal += "0";
        let gruposDec = [];
        for (let i = 0; i < decimal.length; i += 4) {
            gruposDec.push(decimal.slice(i, i + 4));
        }
        let decRes = gruposDec.map(sub => {
            let valor = parseInt(convertirBinADec(sub, ""));
            return valor >= 10 ? cambiarNumeroALetra(valor) : valor.toString();
        });
        resultado += "," + decRes.join("");
    }
    return resultado;
}

export function convertirOctalADec(entero, decimal) {
    let nroOctEntero = 0;
    let nroOctDecimal = 0;
    let indice = entero.length - 1;
    for (let i = 0; i < entero.length; i++) {
        nroOctEntero += (parseInt(entero[i])) * 8 ** indice;
        indice -= 1;
    }
    if (decimal && decimal.length > 0) {
        nroOctDecimal = convertirOctalDecimalADecimal(decimal);
    }
    return (nroOctEntero + nroOctDecimal).toString().replace(".", ",");
}

export function convertirOctalABin(entero, decimal) {
    let solucion = entero.split("").map(n => convertirDecABin(parseInt(n), "").padStart(3, '0'));
    let resultado = solucion.join("").replace(/^0+(?!$)/, ""); // quitar ceros iniciales innecesarios
    if (decimal && decimal.length > 0) {
        let solucionDec = decimal.split("").map(n => convertirDecABin(parseInt(n), "").padStart(3, '0'));
        resultado += "," + solucionDec.join("");
    }
    return resultado;
}

export function convertirOctalAHex(entero, decimal) {
    const binario = convertirOctalABin(entero, decimal);
    const [ent, dec] = binario.includes(",") ? binario.split(",") : [binario, ""];
    return convertirBinAHex(ent, dec);
}

export function convertirHexADec(entero, decimal) {
    let nroHexEntero = 0;
    let nroHexDecimal = 0;
    let indice = entero.length - 1;
    for (let i = 0; i < entero.length; i++) {
        let caracter = entero[i].toUpperCase();
        let nro = isNaN(caracter) ? cambiarLetraAnumero(caracter) : parseInt(caracter);
        nroHexEntero += nro * 16 ** indice;
        indice -= 1;
    }
    if (decimal && decimal.length > 0) {
        nroHexDecimal = convertirHexDecimalADecimal(decimal);
    }
    return (nroHexEntero + nroHexDecimal).toString().replace(".", ",");
}

export function convertirHexABin(entero, decimal) {
    let solucion = entero.split("").map(c => {
        let nro = isNaN(c) ? cambiarLetraAnumero(c.toUpperCase()) : parseInt(c);
        return convertirDecABin(nro, "").padStart(4, '0');
    });
    let resultado = solucion.join("").replace(/^0+(?!$)/, "");
    if (decimal && decimal.length > 0) {
        let solucionDec = decimal.split("").map(c => {
            let nro = isNaN(c) ? cambiarLetraAnumero(c.toUpperCase()) : parseInt(c);
            return convertirDecABin(nro, "").padStart(4, '0');
        });
        resultado += "," + solucionDec.join("");
    }
    return resultado;
}

export function convertirHexAOctal(entero, decimal) {
    const binario = convertirHexABin(entero, decimal);
    const [ent, dec] = binario.includes(",") ? binario.split(",") : [binario, ""];
    return convertirBinAOctal(ent, dec);
}

export function convertirDecABin(entero, decimal) {
    let dividendo = parseInt(entero);
    const divisor = 2;
    let nroBin = [];
    if (dividendo === 0) nroBin.push("0");
    while (dividendo > 0) {
        nroBin.push(dividendo % divisor);
        dividendo = Math.floor(dividendo / divisor);
    }
    nroBin.reverse();
    let solucion = nroBin.join("");
    if (decimal && decimal.length > 0) {
        solucion += "," + convertirDecimalDecABin(decimal);
    }
    return solucion;
}

export function convertirDecAOctal(entero, decimal) {
    let dividendo = parseInt(entero);
    const divisor = 8;
    let nroOctal = [];
    if (dividendo === 0) nroOctal.push("0");
    while (dividendo > 0) {
        nroOctal.push(dividendo % divisor);
        dividendo = Math.floor(dividendo / divisor);
    }
    nroOctal.reverse();
    let solucion = nroOctal.join("");
    if (decimal && decimal.length > 0) {
        solucion += "," + convertirDecimalDecAOctal(decimal);
    }
    return solucion;
}

export function convertirDecAHex(entero, decimal) {
    let dividendo = parseInt(entero);
    const divisor = 16;
    let nroHexa = [];
    if (dividendo === 0) nroHexa.push("0");
    while (dividendo > 0) {
        let nroObtenido = dividendo % divisor;
        nroHexa.push(nroObtenido > 9 ? cambiarNumeroALetra(nroObtenido) : nroObtenido.toString());
        dividendo = Math.floor(dividendo / divisor);
    }
    nroHexa.reverse();
    let solucion = nroHexa.join("");
    if (decimal && decimal.length > 0) {
        solucion += "," + convertirDecimalDecAHex(decimal);
    }
    return solucion;
}

export function calcularComplemento1y2(bin) {
    let solucionA1 = bin.split("").map(e => inversion[e]);
    let solucionA2 = [...solucionA1];
    let acarreo = true;
    for (let i = solucionA2.length - 1; i >= 0; i--) {
        if (acarreo) {
            if (solucionA2[i] === "0") {
                solucionA2[i] = inversion[solucionA2[i]];
                acarreo = false;
            } else {
                solucionA2[i] = inversion[solucionA2[i]];
            }
        }
    }
    return {
        solucionA1: solucionA1.join(""),
        solucionA2: solucionA2.join("")
    };
}
