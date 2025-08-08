import {desarmar} from "./desarmar.js"
import {convertirBinADec,convertirBinAOctal,convertirBinAHex,convertirOctalADec,convertirHexADec, convertirDecABin,convertirDecAOctal,convertirDecAHex, convertirOctalABin,convertirOctalAHex} from "./funciones.js"



export function convertir(valor,sistema){
   const entero = desarmar(valor).entero;
   const decimal = desarmar(valor).decimal;

   //Primero debemos verificar a que sistema pertenece el valor que recibimos, por lo tanto podemos hacer un switch case:

   switch(sistema){
      case "decimal":
            convertirDecABin(valor)
            convertirDecAOctal(valor)
            convertirDecAHex(valor)
      case "binario":
        convertirBinADec(valor)
        convertirBinAOctal(valor)
        convertirBinAHex(valor)
        break;
      case "octal":
         convertirOctalADec(valor)
         convertirOctalABin(valor)
         convertirOctalAHex(valor)
         break;
      case "hexadecimal":
         convertirHexADec(valor)
         break;
      default:
         alert("Perdón, tipo de sistema no reconocido")
         break;
   }
}