const letrasAnumeros = {
    "A" : 10,
    "B" : 11,
    "C" : 12,
    "D" : 13,
    "E" : 14,
    "F" : 15,
}

const numerosALetras = {
    10 : "A",
    11 : "B",
    12 : "C",
    13 : "D",
    14 : "E",
    15 : "F",
}
export function cambiarLetraAnumero(letra){
    letra = letrasAnumeros[letra.toUpperCase()]
    return letra //Ahora deberia ser un nro
}


export function cambiarNumeroALetra(nro){
    nro = numerosALetras[nro]
    return nro //Ahora es una letra de la A a la F
}