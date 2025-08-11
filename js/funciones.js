import {cambiarLetraAnumero, cambiarNumeroALetra} from "./CambiarLetraANumero.js"

const inversion = {
    "1": "0",
    "0": "1"
}

// Funciones para conversión de partes decimales
function convertirDecimalBinADecimal(decimal){
    let nroBinDecimal = 0;
    for (let i = 0; i < decimal.length; i++) {
        nroBinDecimal += parseInt(decimal[i]) * (2 ** -(i + 1));
    }
    return nroBinDecimal;
}

function convertirOctalDecimalADecimal(decimal){
    let nroOctDecimal = 0;
    for (let i = 0; i < decimal.length; i++) {
        nroOctDecimal += parseInt(decimal[i]) * (8 ** -(i + 1));
    }
    return nroOctDecimal;
}

function convertirHexDecimalADecimal(decimal){
    let nroHexDecimal = 0;
    for (let i = 0; i < decimal.length; i++) {
        let caracter = decimal[i].toUpperCase();
        let nro;
        if(isNaN(caracter)){
            nro = cambiarLetraAnumero(caracter)
        }
        else{
            nro = parseInt(caracter)
        }
        nroHexDecimal += nro * (16 ** -(i + 1))
    }
    return nroHexDecimal
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
        
        if (digit > 9) {
            digit = cambiarNumeroALetra(digit);
        }
        
        resultado.push(digit);
        nro -= Math.floor(nro);
        precision--;
    }
    
    return resultado.join("") || "0";
}

// Funciones principales de conversión
export function convertirBinADec(entero, decimal){
    let nroBinEntero = 0;
    let nroBinDecimal = 0;
    let indice = entero.length - 1;
    
    for(let i = 0; i < entero.length; i++) {
        nroBinEntero += (parseInt(entero[i])) * 2 ** indice;
        indice -= 1;
    }
    
    if (decimal && decimal.length > 0) {
        nroBinDecimal = convertirDecimalBinADecimal(decimal);
    }
    
    return (nroBinEntero + nroBinDecimal).toString().replace(".",",");
}

export function convertirBinAOctal(entero, decimal){
    let solucion = [];
    
    // Parte entera
    while(entero.length % 3 !== 0){
        entero = "0" + entero;
    }
    
    let grupos = [];
    for (let i = 0; i < entero.length; i += 3) {
        grupos.push(entero.slice(i, i + 3));
    }
    
    for(let subconjuntos of grupos) {
        solucion.push(convertirBinADec(subconjuntos, ""));
    }
    
    let resultado = solucion.join("");
    
    // Parte decimal
    if (decimal && decimal.length > 0) {
        let decimalBinario = decimal;
        while(decimalBinario.length % 3 !== 0) {
            decimalBinario += "0";
        }
        
        grupos = [];
        for (let i = 0; i < decimalBinario.length; i += 3) {
            grupos.push(decimalBinario.slice(i, i + 3));
        }
        
        solucion = [];
        for(let subconjuntos of grupos) {
            solucion.push(convertirBinADec(subconjuntos, ""));
        }
        
        resultado += "," + solucion.join("");
    }
    
    return resultado;
}

export function convertirBinAHex(entero, decimal){
    let solucion = "";
    
    // Parte entera
    while(entero.length % 4 !== 0){
        entero = "0" + entero;
    }
    
    let grupos = [];
    for (let i = 0; i < entero.length; i += 4) {
        grupos.push(entero.slice(i, i + 4));
    }
    
    for(let subconjuntos of grupos) {
        let nro = convertirBinADec(subconjuntos, "");
        solucion += nro >= 10 ? cambiarNumeroALetra(nro) : nro.toString();
    }
    
    // Parte decimal
    if (decimal && decimal.length > 0) {
        let decimalBinario = decimal;
        while(decimalBinario.length % 4 !== 0) {
            decimalBinario += "0";
        }
        
        grupos = [];
        for (let i = 0; i < decimalBinario.length; i += 4) {
            grupos.push(decimalBinario.slice(i, i + 4));
        }
        
        let decimalHex = "";
        for(let subconjuntos of grupos) {
            let nro = convertirBinADec(subconjuntos, "");
            decimalHex += nro >= 10 ? cambiarNumeroALetra(nro) : nro.toString();
        }
        
        solucion += "," + decimalHex;
    }
    
    return solucion;
}

export function convertirOctalADec(entero, decimal){
    let nroOctEntero = 0;
    let nroOctDecimal = 0;
    let indice = entero.length - 1;
    
    for(let i = 0; i < entero.length; i++) {
        nroOctEntero += (parseInt(entero[i])) * 8 ** indice;
        indice -= 1;
    }
    
    if (decimal && decimal.length > 0) {
        nroOctDecimal = convertirOctalDecimalADecimal(decimal);
    }
    
    return (nroOctEntero + nroOctDecimal).toString().replace(".",",");
}

export function convertirOctalABin(entero, decimal){
    let solucion = [];
    
    // Parte entera
    for(let nro of entero) {
        solucion.push(convertirDecABin(parseInt(nro), ""));
    }
    
    let resultado = solucion.join("");
    
    // Parte decimal
    if (decimal && decimal.length > 0) {
        solucion = [];
        for(let nro of decimal) {
            solucion.push(convertirDecABin(parseInt(nro), "").padStart(3, '0'));
        }
        
        resultado += "," + solucion.join("");
    }
    
    return resultado;
}

export function convertirOctalAHex(entero, decimal){
    // Convertir a binario primero
    const binario = convertirOctalABin(entero, decimal);
    const [parteEnteraBin, parteDecimalBin] = binario.includes(",") ? binario.split(",") : [binario, ""];
    
    // Luego convertir binario a hexadecimal
    return convertirBinAHex(parteEnteraBin, parteDecimalBin);
}

export function convertirHexADec(entero, decimal){
    let nroHexEntero = 0;
    let nroHexDecimal = 0;
    let indice = entero.length - 1;
    
    for(let i = 0; i < entero.length; i++) {
        let caracter = entero[i].toUpperCase();
        let nro = isNaN(caracter) ? cambiarLetraAnumero(caracter) : parseInt(caracter);
        nroHexEntero += nro * 16 ** indice;
        indice -= 1;
    }
    
    if (decimal && decimal.length > 0) {
        nroHexDecimal = convertirHexDecimalADecimal(decimal);
    }
    
    return (nroHexEntero + nroHexDecimal).toString().replace(".",",");
}

export function convertirHexABin(entero, decimal){
    let solucion = [];
    
    // Parte entera
    for(let caracter of entero) {
        caracter = caracter.toUpperCase();
        let nro = isNaN(caracter) ? cambiarLetraAnumero(caracter) : parseInt(caracter);
        solucion.push(convertirDecABin(nro, "").padStart(4, '0'));
    }
    
    let resultado = solucion.join("");
    
    // Parte decimal
    if (decimal && decimal.length > 0) {
        solucion = [];
        for(let caracter of decimal) {
            caracter = caracter.toUpperCase();
            let nro = isNaN(caracter) ? cambiarLetraAnumero(caracter) : parseInt(caracter);
            solucion.push(convertirDecABin(nro, "").padStart(4, '0'));
        }
        
        resultado += "," + solucion.join("");
    }
    
    return resultado;
}

export function convertirHexAOctal(entero, decimal){
    // Convertir a binario primero
    const binario = convertirHexABin(entero, decimal);
    const [parteEnteraBin, parteDecimalBin] = binario.includes(",") ? binario.split(",") : [binario, ""];
    
    // Luego convertir binario a octal
    return convertirBinAOctal(parteEnteraBin, parteDecimalBin);
}

export function convertirDecABin(entero, decimal){
    let dividendo = parseInt(entero);
    const divisor = 2;
    let nroBin = [];
    
    if (dividendo === 0) {
        nroBin.push("0");
    }
    
    while(dividendo > 0){
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

export function convertirDecAOctal(entero, decimal){
    let dividendo = parseInt(entero);
    const divisor = 8;
    let nroOctal = [];
    
    if (dividendo === 0) {
        nroOctal.push("0");
    }
    
    while(dividendo > 0){
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

export function convertirDecAHex(entero, decimal){
    let dividendo = parseInt(entero);
    const divisor = 16;
    let nroHexa = [];
    
    if (dividendo === 0) {
        nroHexa.push("0");
    }
    
    while(dividendo > 0){
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

export function calcularComplemento1y2(bin){
    let solucionA1 = [];
    for(let element of bin) {
        solucionA1.push(inversion[element]);
    }
    
    let solucionA2 = [...solucionA1];
    let acarreo = true;
    
    for(let i = solucionA2.length-1; i >= 0; i--) {
        if(acarreo) {
            if(solucionA2[i] === "0") {
                solucionA2[i] = inversion[solucionA2[i]];
                acarreo = false;
            }
            else {
                solucionA2[i] = inversion[solucionA2[i]];
            } 
        }
    }
    
    return {
        solucionA1: solucionA1.join(""),
        solucionA2: solucionA2.join("")
    };
}