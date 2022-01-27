function crearBoton(texto="Aceptar") {
    const $boton = document.createElement("button");
    $boton.textContent = texto;
    return $boton;
}

function crearInput(){
    const $input = document.createElement("input");
    $input.setAttribute("type", "number");
    $input.setAttribute("min", "1");
    return $input;
}

function agregarLabelsEInputs(nodo, n){
    for (let i = 0; i < n; i++) {
        const $label = document.createElement("label");
        $label.textContent = `${i + 1}`;
        const $input = crearInput();
        $label.appendChild($input);
        nodo.insertBefore($label, document.querySelector("#boton-calcular"));
    }
}

document.querySelector("#boton-continuar").onclick = function () {
    const cantidadIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);
    if(cantidadIntegrantes<=0){
        alert("Por favor, ingresá un número positivo.")
    }else{
        const $integrantes = document.querySelector("#integrantes");
        agregarLabelsEInputs($integrantes, cantidadIntegrantes);
        $integrantes.style = "display: visible";
        document.querySelector("#boton-continuar").disabled = true;
        document.querySelector("#cantidad-integrantes").disabled = true;
        document.querySelector("#reset").disabled = false;
    }
}

function obtenerEdades($inputs) {
    const edades = [];
    for (let i = 0; i < $inputs.length; i++) {
        edades.push(Number($inputs[i].value));
    }
    return edades;
}

function obtenerMayorEdad(edades) {
    let maximo = edades[0];
    for (let i = 0; i < edades.length; i++) {
        if (maximo < edades[i]) {
            maximo = edades[i];
        }
    }
    return maximo;
}

function obtenerMenorEdad(edades) {
    let minimo = edades[0];
    for (let i = 0; i < edades.length; i++) {
        if (minimo > edades[i]) {
            minimo = edades[i];
        }
    }
    return minimo;
}

function obtenerEdadPromedio(edades) {
    let sumaTotal = 0;
    for (let i = 0; i < edades.length; i++) {
        sumaTotal += edades[i];
    }
    return Math.round(sumaTotal / edades.length);
}

function hayEdadInvalida(edades){
    for(let i=0; i<edades.length; i++){
        if(edades[i]<=0){
            return true;
        }
    }
    return false;
}

document.querySelector("#boton-calcular").onclick = function () {
    const edades = obtenerEdades(document.querySelectorAll("#integrantes input"));
    if(hayEdadInvalida(edades)){
        alert("Todas las edades deben ser mayores a 0");
    }else{
        document.querySelector("#resultados").style = "display: visible";
        document.querySelector("#mayor").textContent = `La mayor edad es ${obtenerMayorEdad(edades)}`;
        document.querySelector("#menor").textContent = `La menor edad es ${obtenerMenorEdad(edades)}`;
        document.querySelector("#promedio").textContent = `La edad promedio aproximada es ${obtenerEdadPromedio(edades)}`;
    }
}

function eliminarLabelsEInputs(nodo){
    const $labels = nodo.querySelectorAll("label");
    for(let i=0; i<$labels.length; i++){
        nodo.removeChild($labels[i]);
    }
}

document.querySelector("#reset").onclick = function(){
    const $integrantes = document.querySelector("#integrantes");
    eliminarLabelsEInputs($integrantes);
    $integrantes.style = "display: none";
    document.querySelector("#boton-continuar").disabled = false;
    document.querySelector("#cantidad-integrantes").disabled = false;
    document.querySelector("#reset").disabled = true;
    document.querySelector("#resultados").style = "display: none";
}



