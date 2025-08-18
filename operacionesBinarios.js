import { realizarOperaciones } from "./js/operaciones.js";
import {eliminarHistorial} from "./js/eliminarHistorial.js"
import { armarHistorial } from "./js/armarHistorial.js";

const caracteresPermitidos = ["0", "1", ",", "."];


function esBinarioValido(valor) {
    if (typeof valor !== 'string' || valor.trim() === '') {
        return false;
    }
    
    for (let char of valor) {
        if (!caracteresPermitidos.includes(char)) {
            return false;
        }
    }
    
    const puntosComas = valor.split('').filter(c => c === '.' || c === ',');
    if (puntosComas.length > 1) {
        return false;
    }
    
    return true;
}

export const OperacionesPage = {
    template: `
        <form id="form-entrada">
            <label for="input1">Ingrese el primer número binario</label>
            <input name="valor1" type="text" id="input1" required>
            <label for="input2">Ingrese el segundo número binario</label>
            <input name="valor2" type="text" id="input2" required>
            <button type="submit" id="buttonOperacion" class="disabled" disabled>
                Realizar operaciones
            </button>
            <div id="error-message" class="error-message" style="display: none;"></div>
        </form>
    `,

    init: () => {
        const formularioHTML = document.getElementById("form-entrada");
        const input1 = document.getElementById("input1");
        const input2 = document.getElementById("input2");
        const button = document.getElementById("buttonOperacion");
        const errorMessage = document.getElementById("error-message");
        const elimHistorial = document.querySelector(".elimHistorial");
        const resultadosContainer = document.getElementById("resultados");
        resultadosContainer.innerHTML = "";
        function actualizarEstadoInput(input, esValido, mensaje = "") {
            input.classList.remove("vacia", "correcto", "incorrecto");
            
            if (input.value.trim() === "") {
                input.classList.add("vacia");
            } else {
                input.classList.add(esValido ? "correcto" : "incorrecto");
            }
            
            if (mensaje) {
                errorMessage.textContent = mensaje;
                errorMessage.style.display = "block";
            } else {
                errorMessage.style.display = "none";
            }
        }
        function validar() {
            const valor1 = input1.value.trim();
            const valor2 = input2.value.trim();
            let esValido = true;

            if (valor1 === "") {
                actualizarEstadoInput(input1, false, "El primer número es requerido");
                esValido = false;
            } else if (!esBinarioValido(valor1)) {
                actualizarEstadoInput(input1, false, "El primer número contiene caracteres no binarios");
                esValido = false;
            } else {
                actualizarEstadoInput(input1, true);
            }

            if (valor2 === "") {
                actualizarEstadoInput(input2, false, "El segundo número es requerido");
                esValido = false;
            } else if (!esBinarioValido(valor2)) {
                actualizarEstadoInput(input2, false, "El segundo número contiene caracteres no binarios");
                esValido = false;
            } else {
                actualizarEstadoInput(input2, true);
            }


            button.disabled = !esValido;
            button.classList.toggle("enabled", esValido);
            button.classList.toggle("disabled", !esValido);

            return esValido;
        }

        input1.addEventListener("input", () => {
            validar();
            if (input1.value.trim() && !esBinarioValido(input1.value)) {
                actualizarEstadoInput(input1, false, "Solo se permiten: 0, 1, punto (.) o coma (,)");
            } else {
                errorMessage.style.display = "none";
            }
        });

        input2.addEventListener("input", () => {
            validar();
            if (input2.value.trim() && !esBinarioValido(input2.value)) {
                actualizarEstadoInput(input2, false, "Solo se permiten: 0, 1, punto (.) o coma (,)");
            } else {
                errorMessage.style.display = "none";
            }
        });

        validar();
         formularioHTML.addEventListener("submit", (e) => {
            e.preventDefault();
            if(validar()) {  
                const resultadosHTML = realizarOperaciones(
                    input1.value.trim(),
                    input2.value.trim());
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