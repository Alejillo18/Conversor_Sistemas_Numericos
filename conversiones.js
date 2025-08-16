import { convertir } from "../js/conversion.js";
import { armarHistorial } from "../js/armarHistorial.js";
import { eliminarHistorial } from "../js/eliminarHistorial.js";

const caracteresPorSistema = {
    "decimal" : ["0","1","2","3","4","5","6","7","8","9",",","."],
    "octal" : ["0","1","2","3","4","5","6","7",",","."],
    "hexadecimal": ["0","1","2","3","4","5","6","7","8","9","a","A","b","B","c","C","d","D","e","E","f","F",",","."],
    "binario" : ["0","1",",","."]
};

function verificarIngreso(valor,tipo) {
    if (typeof valor !== 'string' || valor.trim() === '') {
        return false;
    }
    
    for (let char of valor) {
        if (!caracteresPorSistema[tipo].includes(char)) {
            return false;
        }
    }
    
    const puntosComas = valor.split('').filter(c => c === '.' || c === ',');
    if (puntosComas.length > 1) {
        return false;
    }
    
    return true;
}

// Exporta un objeto con la configuración de la página
export const ConversionPage = {
    template: `
        <form id="form-entrada">
            <label for="input">Ingrese el número que desea convertir</label>
            <input name="valor" type="text" id="input" required>
            <label for="sistema">Seleccione el sistema desde el cual desea realizar la conversión</label>
            <select name="sistema" id="sistema" required>
                <option value="decimal">Decimal</option>
                <option value="binario">Binario</option>
                <option value="octal">Octal</option>
                <option value="hexadecimal">Hexadecimal</option>
            </select>
            <button type="submit" id="buttonConvertir" class="disabled" disabled>Convertir</button>
        </form>
    `,
    init: () => {
        const formularioHTML = document.getElementById("form-entrada");
        const valor = document.getElementById("input");
        const sistema = document.getElementById("sistema");
        const button = document.getElementById("buttonConvertir");
        const historial = document.getElementById("historial");
        const elimHistorial = document.querySelector(".elimHistorial");

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

        valor.addEventListener("input", validar);
        sistema.addEventListener("change", validar);
        validar();

        formularioHTML.addEventListener("submit", (e) => {
            e.preventDefault();
            if(validar()) {
                let sistema = formularioHTML.sistema.value;
                let valor = formularioHTML.valor.value;  
                const resultadosHTML = convertir(valor, sistema);
                const resultadosContainer = document.getElementById("resultados");
                resultadosContainer.innerHTML = resultadosHTML;
            }
            historial.innerHTML = armarHistorial(elimHistorial);
        });

        historial.innerHTML = armarHistorial(elimHistorial);

       elimHistorial.addEventListener("click",() => {

    //card con verificacion de borrado de historial

    Swal.fire({
  title: "¿Estás seguro?",
  text: "Se borrará todo el historial y no podrás recuperarlo.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sí, borrar",
  cancelButtonText: "Cancelar",
   background: `#fff url("assets/bg.png") no-repeat center/cover`,
  backdrop: `
    rgba(0,0,0,0.5)
    left top
    no-repeat
  `,
  color : `white`
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
  title: "¡Eliminado!",
  text: "Tu historial fue borrado con éxito.",
  icon: "success",
  confirmButtonColor: "#3085d6",
  background: `url("assets/bg.png") no-repeat center/cover`,
  color: "#fff",
  customClass: {
    icon: "swal2-icon-light"
  }
});
    eliminarHistorial(elimHistorial);
    historial.innerHTML = armarHistorial(elimHistorial);
  }
});

    historial.innerHTML = armarHistorial(elimHistorial);
})
    }
};