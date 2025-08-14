export function eliminarHistorial(button){
    localStorage.clear();
    button.classList.add("disabled")
    button.classList.remove("enabled")
}