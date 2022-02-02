function crearBoton(texto="Aceptar") {
    const $boton = document.createElement("button");
    $boton.textContent = texto;
    return $boton;
}

function crearLabel(texto, clase=""){
    const $label = document.createElement("label");
    $label.textContent = texto;
    $label.setAttribute("class", clase);
    if(clase==="salario"){
        $label.setAttribute("style", "display: none");
    }
    return $label;
}

function crearInput(clase){
    const $input = document.createElement("input");
    $input.setAttribute("type", "number");
    $input.setAttribute("min", "1");
    $input.setAttribute("class", clase);
    if(clase==="salario"){
        $input.setAttribute("style", "display: none");
    }
    return $input;
}

function crearIntegrante(n){
    const $integrante = crearLabel(`Integrante ${n}.`);
    $integrante.setAttribute("class", "integrante");
    $integrante.appendChild(crearLabel("Edad:", "edad"));
    $integrante.appendChild(crearInput("edad"));
    $integrante.appendChild(crearLabel("Salario anual:", "salario"));
    $integrante.appendChild(crearInput("salario"));
    return $integrante;
}

function agregarIntegrantes(nodo, n){
    for (let i = 0; i < n; i++) {
        nodo.insertBefore(crearIntegrante(i+1), document.querySelector("#boton-agregar-salarios"));
    }
}

document.querySelector("#boton-continuar").onclick = function () {
    const cantidadIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);
    if(cantidadIntegrantes<=0){
        alert("Por favor, ingresá un número positivo.")
    }else{
        const $integrantes = document.querySelector("#integrantes");
        agregarIntegrantes($integrantes, cantidadIntegrantes);
        $integrantes.style = "display: visible";
        document.querySelector("#boton-continuar").disabled = true;
        document.querySelector("#cantidad-integrantes").disabled = true;
        document.querySelector("#reset").disabled = false;
    }
}

function obtenerNumeros($inputs) {
    const numeros = [];
    for (let i = 0; i < $inputs.length; i++) {
        numeros.push(Number($inputs[i].value));
    }
    return numeros;
}

function obtenerMayor(numeros) {
    let maximo = numeros[0];
    for (let i = 0; i < numeros.length; i++) {
        if (maximo < numeros[i]) {
            maximo = numeros[i];
        }
    }
    return maximo;
}

function obtenerMenor(numeros) {
    let minimo = numeros[0];
    for (let i = 0; i < numeros.length; i++) {
        if (minimo > numeros[i]) {
            minimo = numeros[i];
        }
    }
    return minimo;
}

function obtenerPromedio(numeros) {
    let sumaTotal = 0;
    for (let i = 0; i < numeros.length; i++) {
        sumaTotal += numeros[i];
    }
    return (sumaTotal / numeros.length);
}

function obtenerSalarioMensual(salarioAnual){
    const mesesEnUnAnio = 12;
    return salarioAnual/mesesEnUnAnio;
}

function obtenerSalariosMensuales(salariosAnuales){
    const salariosMensuales = [];
    for(let i=0; i<salariosAnuales.length; i++){
        salariosMensuales.push(obtenerSalarioMensual(salariosAnuales[i]));
    }
    return salariosMensuales;
}

function hayNumeroInvalido(numeros, limite){
    for(let i=0; i<numeros.length; i++){
        if(numeros[i]<limite){
            return true;
        }
    }
    return false;
}

function hacerCalculosEdades(){
    const edades = obtenerNumeros(document.querySelectorAll("#integrantes input.edad"));
    if(hayNumeroInvalido(edades, 1)){
        document.querySelector("#resultados-edad").style = "display: none";
        alert("Todas las edades deben ser mayores a 0");
    }else{
        document.querySelector("#resultados-edad").style = "display: visible";
        document.querySelector("#mayor-edad").textContent = `La mayor edad es ${obtenerMayor(edades)}`;
        document.querySelector("#menor-edad").textContent = `La menor edad es ${obtenerMenor(edades)}`;
        document.querySelector("#promedio-edad").textContent = `La edad promedio aproximada es ${Math.round(obtenerPromedio(edades))}`;
    }
}

function filtrarCeros(numeros){
    const numerosFiltrados = [];
    for(let i=0; i<numeros.length; i++){
        if(numeros[i]!==0){
            numerosFiltrados.push(numeros[i]);
        }
    }
    return numerosFiltrados;
}

function hacerCalculosSalarios(){
    const salarios = filtrarCeros(obtenerNumeros(document.querySelectorAll("#integrantes input.salario")));
    if(salarios.length===0){
        document.querySelector("#resultados-salario").style = "display: none";
        alert("Por favor ingresar al menos un salario válido");
    }else if(hayNumeroInvalido(salarios, 0)){
        document.querySelector("#resultados-salario").style = "display: none";
        alert("Los salarios ingresados deben ser mayores a 0");
    }else{
        document.querySelector("#resultados-salario").style = "display: visible";
        document.querySelector("#mayor-salario").textContent = `El mayor salario anual es ${obtenerMayor(salarios)}`;
        document.querySelector("#menor-salario").textContent = `El menor salario anual es ${obtenerMenor(salarios)}`;
        document.querySelector("#promedio-anual-salario").textContent = `El salario anual promedio es ${obtenerPromedio(salarios)}`;
        document.querySelector("#promedio-mensual-salario").textContent = `El salario mensual promedio es ${obtenerPromedio(obtenerSalariosMensuales(salarios))}`;
    }
}

document.querySelector("#boton-calcular").onclick = function () {
    hacerCalculosEdades();
    if(!document.querySelector("#boton-quitar-salarios").disabled){
        hacerCalculosSalarios();
    }
}

function eliminarIntegrantes(nodo){
    const $integrantes = nodo.querySelectorAll("label.integrante");
    for(let i=0; i<$integrantes.length; i++){
        nodo.removeChild($integrantes[i]);
    }
}

document.querySelector("#reset").onclick = function(){
    const $listaIntegrantes = document.querySelector("#integrantes");
    eliminarIntegrantes($listaIntegrantes);
    $listaIntegrantes.style = "display: none";
    document.querySelector("#boton-continuar").disabled = false;
    document.querySelector("#cantidad-integrantes").disabled = false;
    document.querySelector("#reset").disabled = true;
    document.querySelector("#boton-agregar-salarios").disabled = false;
    document.querySelector("#boton-quitar-salarios").disabled = true;
    document.querySelector("#resultados-edad").style = "display: none";
    document.querySelector("#resultados-salario").style = "display: none";
}

document.querySelector("#boton-agregar-salarios").onclick = function(){
    const $salarios = document.querySelectorAll(".salario");
    for(let i=0; i<$salarios.length; i++){
        $salarios[i].style = "display: visible";
    }
    document.querySelector("#boton-quitar-salarios").disabled = false;
    document.querySelector("#boton-agregar-salarios").disabled = true;
}

document.querySelector("#boton-quitar-salarios").onclick = function(){
    const $salarios = document.querySelectorAll(".salario");
    for(let i=0; i<$salarios.length; i++){
        $salarios[i].style = "display: none";
    }
    document.querySelector("#resultados-salario").style = "display: none";
    document.querySelector("#boton-quitar-salarios").disabled = true;
    document.querySelector("#boton-agregar-salarios").disabled = false;
}

