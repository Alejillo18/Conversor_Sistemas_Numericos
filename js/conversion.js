import {desarmar} from "./desarmar.js"
import {convertirBinADec,convertirOctalADec,convertirHexADec} from "./funciones.js"



export function convertir(valor,sistema){
   const entero = desarmar(valor).entero;
   const decimal = desarmar(valor).decimal;

   //Primero debemos verificar a que sistema pertenece el valor que recibimos, por lo tanto podemos hacer un switch case:

   switch(sistema){
      case "decimal":

      case "binario":
        console.log (convertirBinADec(valor))
        break;
      case "octal":
         console.log(convertirOctalADec(valor))
         break;
      case "hexadecimal":
         console.log(convertirHexADec(valor))
         break;
      default:
         alert("Perdón, tipo de sistema no reconocido")
         break;
   }
}