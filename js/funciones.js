import {cambiarLetraAnumero, cambiarNumeroALetra} from "./CambiarLetraANumero.js"

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



export function convertirBinAOctal(valor){
    let solucion = [];
        //La forma mas sencila seria pasarlo de binario a decimal y de ahi a octal, pero vamos a realizarlo como se debe
        while(valor.length % 3 !== 0){
            valor = "0" + valor;
        }
        let grupos = [];
        for (let i = 0; i < valor.length; i+=3){
            grupos.push(valor.slice(i,i+3))
        }  
        /* Agrupamos de a tres los valores para realizar la conversion */
        for(let subconjuntos of grupos){
           solucion.push(convertirBinADec(subconjuntos))
           //Como sabemos que 3 digitos en binario como maximo llegan al 7, usamos dicha funcion (111) = 7 en decimal
        }
        solucion = solucion.join("")
        return solucion;
}

export function convertirBinAHex(valor){
    let nro = 0;
    let solucion = "";
        while(valor.length % 4!== 0){
            valor = "0" + valor;
        }
        let grupos = [];
        for (let i = 0; i < valor.length; i+=4){
            grupos.push(valor.slice(i,i+4))
        }  
        /* Agrupamos de a cuatro los valores para realizar la conversion */
        for(let subconjuntos of grupos){
           nro =  (convertirBinADec(subconjuntos))
           solucion += nro>=10 ? cambiarNumeroALetra(nro) : nro.toString()
        }
        return solucion;
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


export function convertirOctalABin(valor){
    //Como cada digito corresponde a una serie de 3 digitos binarios (111) como maximo, lo que corresponde es: 
    let solucion = [];
    let tresBin = 0;
    for(let nro of valor){
        tresBin = convertirDecABin(nro);
        solucion.push(tresBin.join(""));
    }
    solucion = solucion.join("")
    return solucion
}

export function convertirOctalAHex(valor){
    //Primero convertimos cada nro a binario, donde cada uno representa una cadena de 3 caracteres binarios (111) como maximo.reutilizando la funcion anterior.
   let bin = convertirOctalABin(valor)
   bin = bin.toString()
   //Ahora debemos agrupar dicha cadena en grupos de 4, rellenando donde haga falta con 0 a la izquierda para respetar el patron:
   while(bin.length % 4!== 0){
            bin = "0" + bin;
        }
        let grupos = [];
        for (let i = 0; i < bin.length; i+=4){
            grupos.push(bin.slice(i,i+4))
        }  
        let nro;
        let solucion = [];
        /* Agrupamos de a cuatro los valores para realizar la conversion */
        for(let subconjuntos of grupos){
           nro =  (convertirBinADec(subconjuntos))
           solucion += nro>=10 ? cambiarNumeroALetra(nro) : nro.toString()
        }
        console.log(solucion)
        return solucion;
}

export function convertirHexADec(valor){
    let nroDecimalHex = 0;
    let indice = valor.length - 1
    for(let i = 0 ; i < valor.length; i ++){
        let caracter = valor[i].toUpperCase();
        let nro;

        if(isNaN(caracter)){
            nro = cambiarLetraAnumero(caracter)
            
        }
        else{
            nro = parseInt(caracter)
        }
        nroDecimalHex += nro * 16 ** indice
        indice -= 1;
    }
    return nroDecimalHex
} 


export function convertirDecABin(valor){
    let dividendo = valor
    const divisor = 2;
    let nroBin = []
    while(dividendo > 0){
        nroBin.push(dividendo % divisor);
        dividendo = Math.floor(dividendo / divisor);
    }
    nroBin.reverse()
    return nroBin
}
export function convertirDecAOctal(valor){
    let dividendo = valor
    const divisor = 8;
    let nroOctal = []
    while(dividendo > 0){
        nroOctal.push(dividendo % divisor);
        dividendo = Math.floor(dividendo / divisor);
    }
    nroOctal.reverse()
    return nroOctal

}
export function convertirDecAHex(valor){
    let dividendo = valor
    const divisor = 16;
    let nroHexa = []
    let nroObtenido = 0;
    while(dividendo > 0){
        nroObtenido = dividendo % divisor
        if(nroObtenido > 9 && nroObtenido<16){
           nroObtenido = cambiarNumeroALetra(nroObtenido)
        }
        nroHexa.push(nroObtenido);
        dividendo = Math.floor(dividendo / divisor);
    }
    nroHexa.reverse()
    return nroHexa

}