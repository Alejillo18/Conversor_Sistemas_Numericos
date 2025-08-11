import {convertir} from "./js/conversion.js"

//Funcion para verificar el tipo y si coincide con el valor ingresado:
const caracteresPorSistema = {
    "decimal" : ["0","1","2","3","4","5","6","7","8","9",",","."],
    "octal" : ["0","1","2","3","4","5","6","7",",","."],
    "hexadecimal": ["0","1","2","3","4","5","6","7","8","9","a","A","b","B","c","C","d","D","e","E","f","F",",","."],
    "binario" : ["0","1",",","."]
};


function verificarIngreso(valor,tipo){
    for(let numero of valor){        
        if(!caracteresPorSistema[tipo].includes(numero)){
            return false;
        }
    }
    return true;
    
}




//Realizamos el html y obtenemos los datos del formulario cuando clickeamos el boton convertir
const container = document.getElementById("container");
let form = ``;
form += `<form id = "form-entrada">
<label for = "input" >Ingrese el numero que desea convertir</label>
<input name = "valor" type="text" id = "input" required></input>
<label for ="sistema" >Seleccione el sistema del cual desea partir la conversión</label>
<select name = "sistema" id = "sistema" requiered>
<option value = "decimal" >Decimal</option>
<option value = "binario">Binario</option>
<option value = "octal">Octal</option>
<option value = "hexadecimal">Hexadecimal</option>
</select>
<button type = "submit" id = "buttonConvertir" class= "disabled" disabled>Convertir</button>
</form>
`;
container.innerHTML = form;

const formularioHTML = document.getElementById("form-entrada");
const valor = document.getElementById("input");
const sistema = document.getElementById("sistema");
const button = document.getElementById("buttonConvertir");

function validar(){
    const entrada = valor.value.trim();
    const numeracion = sistema.value;

    if (entrada === "") {
        valor.classList.add("vacia");
        button.disabled = true;
        button.classList.remove("enabled");
        button.classList.add("disabled");
        return;
      }
    if(verificarIngreso(entrada,numeracion)){
        valor.classList.remove("vacia")
        valor.classList.remove("incorrecto")
        valor.classList.add("correcto")
        button.disabled = false;
        button.classList.remove("disabled");
        button.classList.add("enabled");
        
        return true ;
    }
    else{
        valor.classList.remove("vacia")
        valor.classList.remove("correcto")
        valor.classList.add("incorrecto")
        button.disabled = true;
        button.classList.remove("enabled");
        button.classList.add("disabled");
        return false;
    }

}
valor.addEventListener("input",validar)
sistema.addEventListener("change",validar)
validar()
formularioHTML.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validar()){
    let sistema = formularioHTML.sistema.value;
    let valor = formularioHTML.valor.value;  
     const resultadosHTML = convertir(valor, sistema);
        const resultadosContainer = document.getElementById("resultados");
        resultadosContainer.innerHTML = resultadosHTML;
    }
});
