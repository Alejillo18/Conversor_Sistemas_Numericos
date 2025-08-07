export function convertirBinADec(valor){
    /* De binario a decimal: se debe realizar el polinomio de potencias segun posicion: con la respectiva base 2, por ejemplo 1010 = 1*2**3 + 0*2**2 + 1*2**1 + 0*2**0 */
    let nroDecimalBin = 0;
    let indice = valor.length - 1 
    for(let i = 0 ; i < valor.length; i ++){
        nroDecimalBin += (parseInt(valor[i])) * 2 ** indice
        indice -= 1;
    }
    return nroDecimalBin
}   

export function convertirOctalADec(valor){
    /* De Octal a decimal */
    let nroDecimalOct = 0;
    let indice = valor.length - 1
    for(let i = 0 ; i < valor.length; i ++){
        nroDecimalOct += (parseInt(valor[i])) * 8 ** indice
        indice -= 1;
    }
    return nroDecimalOct
}  

export function convertirHexADec(valor){
    /* De Hexadecimal a decimal*/
    let nroDecimalHex = 0;
    let indice = valor.length - 1
    for(let i = 0 ; i < valor.length; i ++){
        if(valor in letrasAvalor){
            valor = letrasAvalor[valor]
        }
        nroDecimalHex += parseInt(valor[i]) * 16 ** indice
        indice -= 1;
    }
    return nroDecimalHex
} 