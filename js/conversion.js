import {desarmar} from "./desarmar.js"
import {convertirBinADec,convertirBinAOctal,convertirBinAHex,convertirOctalADec,convertirHexADec,convertirHexABin,convertirHexAOctal, 
   convertirDecABin,convertirDecAOctal,convertirDecAHex, convertirOctalABin,convertirOctalAHex,
calcularComplemento1y2} from "./funciones.js"
import {Resultados} from "./resultados.js"
import {obtenerID} from "./obtenerID.js"

export function convertir(valor,sistema){
   const entero = desarmar(valor).entero;
   const decimal = desarmar(valor).decimal;
   let bin;
   let octal;
   let hexa;
   let complementoA1;
   let complementoA2;
   let dec;
   let mostrardatos = ``
   let nro = 0;
   let resultados = {};
   
   //Primero debemos verificar a que sistema pertenece el valor que recibimos, por lo tanto podemos hacer un switch case:

   switch(sistema){
      case "decimal":
         bin= convertirDecABin(entero,decimal);
         octal = convertirDecAOctal(entero,decimal);
         hexa = convertirDecAHex(entero,decimal);
         complementoA1 = calcularComplemento1y2(bin.split(/[,.]/)[0]).solucionA1;
         complementoA2 = calcularComplemento1y2(bin.split(/[,.]/)[0]).solucionA2;
          mostrardatos = `
         <div class="resultados">
         <h2 class= "subtitle">Conversiones:</h2>
        <div class="resultado-item">
        <div class="resultado-item">
            <h3>Decimal</h3>
            <p>${valor}</p>
        </div>
            <h3>Binario</h3>
            <p>${bin}</p>
        </div>
        <div class="resultado-item">
            <h3>Octal</h3>
            <p>${octal}</p>
        </div>
        <div class="resultado-item">
            <h3>Hexadecimal</h3>
            <p>${hexa}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 1</h3>
            <p>${complementoA1}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 2</h3>
            <p>${complementoA2}</p>
        </div>
        <h4>Tanto el complemento a 1 como el complemento a 2 se lo realizamos al número binario y su parte entera. </h4>
        </div>`;
        resultados = new Resultados(valor,bin,octal,hexa,complementoA1,complementoA2)
        nro = obtenerID() + 1;
        localStorage.setItem("res" + nro,JSON.stringify(resultados))
        return mostrardatos;
      case "binario":
      dec = convertirBinADec(entero,decimal)
      octal =convertirBinAOctal(entero,decimal)
       hexa = convertirBinAHex(entero,decimal)
        complementoA1 = calcularComplemento1y2(entero).solucionA1
        complementoA2 = calcularComplemento1y2(entero).solucionA2
         mostrardatos= `
         <div class="resultados">
         <h2 class= "subtitle">Conversiones</h2>
        <div class="resultado-item">
            <h3>Decimal</h3>
            <p>${dec}</p>
        </div>
        <div class="resultado-item">
            <h3>Binario</h3>
            <p>${valor}</p>
        </div>
        <div class="resultado-item">
            <h3>Octal</h3>
            <p>${octal}</p>
        </div>
        <div class="resultado-item">
            <h3>Hexadecimal</h3>
            <p>${hexa}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 1</h3>
            <p>${complementoA1}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 2</h3>
            <p>${complementoA2}</p>
        </div>
        <h4>Tanto el complemento a 1 como el complemento a 2 se lo realizamos al número binario y su parte entera.</h4>
        </div>`;
        resultados = new Resultados(dec,valor,octal,hexa,complementoA1,complementoA2)
        nro = obtenerID() + 1;
        localStorage.setItem("res" + nro,JSON.stringify(resultados))
        return mostrardatos;
      case "octal":
        dec = convertirOctalADec(entero,decimal)
         bin = convertirOctalABin(entero,decimal)
         hexa =convertirOctalAHex(entero,decimal)
         complementoA1 = calcularComplemento1y2(bin.split(/[,.]/)[0]).solucionA1
        complementoA2 = calcularComplemento1y2(bin.split(/[,.]/)[0]).solucionA2
        mostrardatos = `<div class="resultados">
        <h2 class= "subtitle">Conversiones</h2>
        <div class="resultado-item">
            <h3>Decimal</h3>
            <p>${dec}</p>
        </div>
        <div class="resultado-item">
            <h3>Binario</h3>
            <p>${bin}</p>
        </div>
        <div class="resultado-item">
            <h3>Octal</h3>
            <p>${valor}</p>
        </div>
        <div class="resultado-item">
            <h3>Hexadecimal</h3>
            <p>${hexa}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 1</h3>
            <p>${complementoA1}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 2</h3>
            <p>${complementoA2}</p>
        </div>
        <h4>Tanto el complemento a 1 como el complemento a 2 se lo realizamos al número binario y su parte entera. </h4>
        </div>`;
        resultados = new Resultados(dec,bin,valor,hexa,complementoA1,complementoA2)
        nro = obtenerID() + 1;
        localStorage.setItem("res" + nro,JSON.stringify(resultados))
        return mostrardatos;
      case "hexadecimal":
         dec = convertirHexADec(entero,decimal)
         bin = convertirHexABin(entero,decimal)
        octal = convertirHexAOctal(entero,decimal)
         complementoA1 = calcularComplemento1y2(bin.split(/[,.]/)[0]).solucionA1
         complementoA2 = calcularComplemento1y2(bin.split(/[,.]/)[0]).solucionA2
         mostrardatos =`<div class="resultados">
         <h2 class= "subtitle">Conversiones</h2>
        <div class="resultado-item">
            <h3>Decimal</h3>
            <p>${dec}</p>
        </div>
        <div class="resultado-item">
            <h3>Binario</h3>
            <p>${bin}</p>
        </div>
        <div class="resultado-item">
            <h3>Octal</h3>
            <p>${octal}</p>
        </div>
        <div class="resultado-item">
            <h3>Hexadecimal</h3>
            <p>${valor}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 1</h3>
            <p>${complementoA1}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 2</h3>
            <p>${complementoA2}</p>
        </div>
        <h4>Tanto el complemento a 1 como el complemento a 2 se lo realizamos al número binario y su parte entera. </h4>
        </div>`;
        resultados = new Resultados(dec,bin,octal,valor,complementoA1,complementoA2)
        nro = obtenerID() + 1;
        localStorage.setItem("res" + nro,JSON.stringify(resultados))
        return mostrardatos;
      default:
         alert("Perdón, tipo de sistema no reconocido")
         break;
   }
}