import {Resultados}from "./resultados.js"
const sistema = {
    0: "decimal",
    1: "binario",
    2: "octal",
    3: "hexadecimal",
    4: "complemento a 1",
    5: "complemento a 2",
}

export function armarHistorial(){
    let historial = ``
    let resultados = [];
    if(localStorage.length === 0){
        historial += `
        <h4>Todavía no realizo ninguna operación</h4>`
    }
    else{
        historial += `<h2>Historial de operaciones:</h2>`
        for(let i = 0; i<localStorage.length ; i++){
            let key = localStorage.key(i)
            let res = JSON.parse(localStorage.getItem(key));
            res = new Resultados(res.decimal,res.binario,res.octal,res.hexadecimal,res.complemento1,res.complemento2)
            resultados.push(res)
        }
        historial += `<table><tr>
            <th>Sistema</th>
            <th>Valor númerico</th>
            </tr>`
    

    for(let grupres of resultados){
        let i = 0;
        for( let res in grupres){
            historial += 
            `<tr>
            <th>${sistema[i]}</th>
            <th>${grupres[res]}</th>
            </tr>} `
            
            i++;
            }      
           historial += `</table>`     
    }  
    return historial;
}
}

        