import { Resultados } from "./resultados.js";
import { ResultadosOperaciones } from "./resultadosOperaciones.js";

const sistema = {
    0: "decimal",
    1: "binario",
    2: "octal",
    3: "hexadecimal",
    4: "complemento a 1",
    5: "complemento a 2",
};

const tipoOperacion = {
    suma: "Suma",
    resta: "Resta",
    division: "División",
    multiplicacion: "Multiplicación",
    and: "AND lógico",
    or: "OR lógico",
    xor: "XOR lógico",
    not1: "NOT primer número",
    not2: "NOT segundo número",
    desplazamientoizq1: "Desplaz. izquierdo primer número",
    desplazamientoder2: "Desplaz. derecho segundo número",
    complementoA2_1: "Complemento a 2 (primer número)",
    complementoA2_2: "Complemento a 2 (segundo número)"
};

export function armarHistorial(button) {
    let historial = ``;
    
    if (localStorage.length === 0) {
        historial += `<h4>Todavía no realizó ninguna operación</h4>`;
        button.classList.add("disabled");
        button.classList.remove("enabled");
    } else {
        button.classList.add("enabled");
        button.classList.remove("disabled");
        
        let resultadosConversion = [];
        let resultadosOperaciones = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let item = JSON.parse(localStorage.getItem(key));
            
            if (key.startsWith("res")) {
                
                item._keyNum = parseInt(key.replace('res', ''));
                resultadosConversion.push(item);
            } else if (key.startsWith("ope")) {
                
                item._keyNum = parseInt(key.replace('ope', ''));
                resultadosOperaciones.push(item);
            }
        }
        
       
        resultadosConversion.sort((a, b) => b._keyNum - a._keyNum);
        resultadosOperaciones.sort((a, b) => b._keyNum - a._keyNum);
        
        
        if (resultadosConversion.length > 0) {
            historial += `<h2>Historial de conversiones:</h2>`;
            
            for (let res of resultadosConversion) {
                historial += `<table class="historial-table"><tr>
                    <th>Sistema</th>
                    <th>Valor numérico</th>
                </tr>`;
                
                let i = 0;
                for (let prop in res) {
                    if (typeof res[prop] !== 'function' && prop !== '_keyNum') {
                        historial += `
                        <tr>
                            <td>${sistema[i]}</td>
                            <td>${res[prop]}</td>
                        </tr>`;
                        i++;
                    }
                }
                historial += `</table>`;
            }
        }
        
        
        if (resultadosOperaciones.length > 0) {
            historial += `<h2>Historial de operaciones binarias:</h2>`;
            
            for (let op of resultadosOperaciones) {
                historial += `<table class="historial-table"><tr>
                    <th>Operación</th>
                    <th>Resultado binario</th>
                </tr>`;
                
                
                const propiedades = [
                    'suma', 'resta', 'division', 'multiplicacion',
                    'and', 'or', 'xor', 'not1', 'not2',
                    'desplazamientoizq1', 'desplazamientoder2',
                    'complementoA2_1', 'complementoA2_2'
                ];
                
                for (let prop of propiedades) {
                    if (op[prop] !== undefined && tipoOperacion[prop]) {
                        historial += `
                        <tr>
                            <td>${tipoOperacion[prop]}</td>
                            <td>${op[prop]}</td>
                        </tr>`;
                    }
                }
                
                historial += `</table><br>`;
            }
        }
    }
    
    return historial;
}