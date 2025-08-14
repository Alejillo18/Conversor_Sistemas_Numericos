import {Resultados}from "./resultados.js"
const sistema = {
    0: "decimal",
    1: "binario",
    2: "octal",
    3: "hexadecimal",
    4: "complemento a 1",
    5: "complemento a 2",
}

export function armarHistorial(button){
    let historial = ``
    let resultados = [];
    if(localStorage.length === 0){
        historial += `
        <h4>Todavía no realizo ninguna operación</h4>`
        button.classList.add("disabled")
        button.classList.remove("enabled")
    }
    else{
        button.classList.add("enabled")
        button.classList.remove("disabled")
        historial += `<h2>Historial de operaciones:</h2>`
        let resultados = [];

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.startsWith("res")) {
                let res = JSON.parse(localStorage.getItem(key));
                res._keyNum = parseInt(key.replace('res',''));
                resultados.push(res);
            }
        }
        resultados.sort((a, b) => b._keyNum - a._keyNum);
        resultados = resultados.map(res => new Resultados(res.decimal,res.binario,res.octal,res.hexadecimal,res.complemento1,res.complemento2));
        
        
    for(let grupres of resultados){
        historial += `<table><tr>
            <th>Sistema</th>
            <th>Valor númerico</th>
            </tr>`
        let i = 0;
        for( let res in grupres){
            historial += 
            `<tr>
            <th>${sistema[i]}</th>
            <th>${grupres[res]}</th>
            </tr>`
            
            i++;
            }      
           historial += `</table>`     
    }  
}
return historial;
}

        