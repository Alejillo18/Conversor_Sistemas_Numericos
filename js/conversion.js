import {desarmar} from "./desarmar.js"
import {convertirBinADec,convertirBinAOctal,convertirBinAHex,convertirOctalADec,convertirHexADec,convertirHexABin,convertirHexAOctal, 
   convertirDecABin,convertirDecAOctal,convertirDecAHex, convertirOctalABin,convertirOctalAHex,
calcularComplemento1y2} from "./funciones.js"



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
   //Primero debemos verificar a que sistema pertenece el valor que recibimos, por lo tanto podemos hacer un switch case:

   switch(sistema){
      case "decimal":
         bin= convertirDecABin(valor);
         octal = convertirDecAOctal(valor);
         hexa = convertirDecAHex(valor);
         complementoA1 = calcularComplemento1y2(bin).solucionA1;
         complementoA2 = calcularComplemento1y2(bin).solucionA2;
          mostrardatos = `
         <div class="resultados">
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
        </div>`;
        return mostrardatos;
      case "binario":
      dec = convertirBinADec(valor)
      octal =convertirBinAOctal(valor)
       hexa = convertirBinAHex(valor)
        complementoA1 = calcularComplemento1y2(valor).solucionA1
        complementoA2 = calcularComplemento1y2(valor).solucionA2
         mostrardatos= `
         <div class="resultados">
        <div class="resultado-item">
            <h3>Decimal</h3>
            <p>${dec}</p>
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
        </div>`;
        return mostrardatos;
      case "octal":
        dec = convertirOctalADec(valor)
         bin = convertirOctalABin(valor)
         hexa =convertirOctalAHex(valor)
         complementoA1 = calcularComplemento1y2(bin).solucionA1
        complementoA2 = calcularComplemento1y2(bin).solucionA2
        mostrardatos = `<div class="resultados">
        <div class="resultado-item">
            <h3>Decimal</h3>
            <p>${dec}</p>
        </div>
        <div class="resultado-item">
            <h3>Binario</h3>
            <p>${bin}</p>
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
        </div>`;
        return mostrardatos;
      case "hexadecimal":
         dec = convertirHexADec(valor)
         bin = convertirHexABin(valor)
        octal = convertirHexAOctal(valor)
         complementoA1 = calcularComplemento1y2(bin).solucionA1
         complementoA2 = calcularComplemento1y2(bin).solucionA2
         mostrardatos =`<div class="resultados">
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
            <h3>Complemento a 1</h3>
            <p>${complementoA1}</p>
        </div>
        <div class="resultado-item">
            <h3>Complemento a 2</h3>
            <p>${complementoA2}</p>
        </div>
        </div>`;
        return mostrardatos;
      default:
         alert("Perdón, tipo de sistema no reconocido")
         break;
   }
}