export function obtenerIDConv(){
    let res = 0;
    for(let i = 0; i<localStorage.length; i++){
        let llave = localStorage.key(i)
        if(llave.startsWith("res")){
            /* let resultado = JSON.parse(localStorage.getItem(llave)); */
            res += 1
        }
    }
    return res;
}


export function obtenerIDOpe(){
    let op = 0;
    for(let i = 0; i<localStorage.length; i++){
        let llave = localStorage.key(i)
        if(llave.startsWith("ope")){
            op += 1
        }
    }
    return op;
}