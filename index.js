
const inputNombre = document.getElementById('nombre');
const btnEnviar = document.getElementById('enviar');
const mensaje = document.getElementById('error-nombre');






btnEnviar.onclick = (e)=>{
    e.preventDefault();
    nombre = inputNombre.value;
    if(nombre === ''){
        mensaje.innerHTML = 'Por favor, ingresa tu nombre';
        return;
    }
    mensaje.innerHTML = `Hola ${nombre}`

}




