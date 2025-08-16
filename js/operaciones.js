import { ResultadosOperaciones } from "./resultadosOperaciones.js";
import { obtenerIDConv, obtenerIDOpe } from "./obtenerID.js";

export function realizarOperaciones(bin1, bin2) {
    // Conversión a decimal, importante para algunas operaciones
    const dec1 = parseInt(bin1, 2);
    const dec2 = parseInt(bin2, 2);
    let mostrarDatos = ``;
    // Realizar todas las operaciones
    let resultados = {
        suma: (dec1 + dec2).toString(2),
        resta: (dec1 - dec2).toString(2),
        multiplicacion: (dec1 * dec2).toString(2),
        division: dec2 !== 0 ? (dec1 / dec2).toString(2) : "Indefinido (división por cero)",
        and: (dec1 & dec2).toString(2),
        or: (dec1 | dec2).toString(2),
        xor: (dec1 ^ dec2).toString(2),
        not1: (~dec1 >>> 0).toString(2).slice(-Math.max(bin1.length, 1)),
        not2: (~dec2 >>> 0).toString(2).slice(-Math.max(bin2.length, 1)),
        desplazamientoIzq1: (dec1 << 1).toString(2),
        desplazamientoDer2: (dec2 >> 1).toString(2),
        complementoA2_1: (dec1 ^ -1).toString(2),
        complementoA2_2: (dec2 ^ -1).toString(2)
    };

    // Plantilla HTML para mostrar resultados
    mostrarDatos = `
        <div class="resultados-binarios">
            <h3>Resultados para ${bin1} y ${bin2}</h3>
            
            <div class="resultados-grid">
                <section class="operaciones-aritmeticas">
                    <h4>Operaciones Aritméticas</h4>
                    <div class="resultado-item">
                        <span class="operacion">Suma:</span>
                        <span class="valor">${resultados.suma}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">Resta:</span>
                        <span class="valor">${resultados.resta}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">Multiplicación:</span>
                        <span class="valor">${resultados.multiplicacion}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">División:</span>
                        <span class="valor">${resultados.division}</span>
                    </div>
                </section>

                <section class="operaciones-logicas">
                    <h4>Operaciones Lógicas</h4>
                    <div class="resultado-item">
                        <span class="operacion">AND:</span>
                        <span class="valor">${resultados.and}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">OR:</span>
                        <span class="valor">${resultados.or}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">XOR:</span>
                        <span class="valor">${resultados.xor}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">NOT ${bin1}:</span>
                        <span class="valor">${resultados.not1}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">NOT ${bin2}:</span>
                        <span class="valor">${resultados.not2}</span>
                    </div>
                </section>

                <section class="operaciones-desplazamiento">
                    <h4>Desplazamientos</h4>
                    <div class="resultado-item">
                        <span class="operacion">${bin1} << 1:</span>
                        <span class="valor">${resultados.desplazamientoIzq1}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">${bin2} >> 1:</span>
                        <span class="valor">${resultados.desplazamientoDer2}</span>
                    </div>
                </section>

                <section class="operaciones-avanzadas">
                    <h4>Operaciones Avanzadas</h4>
                    <div class="resultado-item">
                        <span class="operacion">Complemento a 2 (${bin1}):</span>
                        <span class="valor">${resultados.complementoA2_1}</span>
                    </div>
                    <div class="resultado-item">
                        <span class="operacion">Complemento a 2 (${bin2}):</span>
                        <span class="valor">${resultados.complementoA2_2}</span>
                    </div>
                </section>
            </div>

            <div class="conversion-decimal">
                <h4>Equivalente Decimal</h4>
                <p>${bin1} = ${dec1} (decimal)</p>
                <p>${bin2} = ${dec2} (decimal)</p>
            </div>
        </div>
    `;
    resultados = new ResultadosOperaciones(resultados.suma,resultados.resta,resultados.division,resultados.multiplicacion,resultados.and,resultados.or,resultados.xor,resultados.not1,resultados.not2,resultados.desplazamientoizq1,resultados.desplazamientoder2,resultados.complementoA2_1,resultados.complementoA2_2)
           const nro = obtenerIDOpe() + 1;
            localStorage.setItem("ope" + nro,JSON.stringify(resultados))
        return mostrarDatos;
}