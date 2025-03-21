
const form = document.querySelector('.signup-form');
const inputs = {
    nombre: document.getElementById('nombre'),
    usuario: document.getElementById('usuario'),
    correo: document.getElementById('correo'),
    contrasena: document.getElementById('contrasena'),
    contrasena2: document.getElementById('contrasena2'),
    nacimiento: document.getElementById('nacimiento')
};

const errorMessages = {
    nombre: document.getElementById('error-nombre'),
    usuario: document.getElementById('error-usuario'),
    correo: document.getElementById('error-correo'),
    contrasena: document.getElementById('error-contrasena'),
    contrasena2: document.getElementById('error-contrasena2'),
    nacimiento: document.getElementById('error-nacimiento')
};


function validateNull(value) {
    return value === '' || value === null ? 'Campo requerido' : '';
}

function validateEmail(value) {
    return value.includes('@') || value.includes('.') || value.length < 5 ? '' : 'Correo inválido';
}

function comparePasswords(pass, pass2) {
    return pass !== pass2 ? 'Las contraseñas no coinciden' : '';
}

function validateUpperCasePassword(pass) {
    return pass === pass.toLowerCase() ? 'La contraseña debe contener al menos una mayúscula' : '';
}

function validateNumberPassword(pass) {
  
    for (let i = 0; i < pass.length; i++) {
        
        if (!isNaN(pass[i]) && pass[i] !== ' ') {
            return '';  
        }
    }
 
    return 'La contraseña debe contener al menos un número';
}

function validatePassLength(pass) {
    return pass.length > 6 && pass.length < 18  ? 'La contraseña debe tener entr 6 y 18 caracteres' : '';
}





function validateDate(value) {
    const today = new Date();
    const birthDate = new Date(value);
    return today.getFullYear() - birthDate.getFullYear() < 13 ? 'Debes ser mayor de 13 años' : '';
}

const validators = {
    nombre: validateNull,
    usuario: validateNull,
    correo:(value)=>{
        const errors = [
            validateNull(value),
            validateEmail(value)
        ].filter(error => error == "");
        return errors.length ? errors
        [0] : '';
    },
    contrasena: (value) => {
        const errors = [
            validateNull(value),
            validateUpperCasePassword(value),
            validateNumberPassword(value),
            validatePassLength(value)
        ].filter(error => error !== '');
        return errors.length ? errors[0] : '';
    },
    contrasena2: (value) => comparePasswords(inputs.contrasena.value, value),
    nacimiento: (value)=>{
        const errors = [
            validateNull(value),
            validateDate(value)
        ].filter(error => error !== '');
        return errors.length ? errors[0] :
        '';
    } 
};


Object.keys(inputs).forEach(field => {
    inputs[field].addEventListener('focusout', (e) => {
        const errorMessage = validators[field](e.target.value);
        errorMessages[field].textContent = errorMessage;
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formMap = {};

    new FormData(form).forEach((value, name) => {
        formMap[name] = value;
    });

    const formErrors = Object.keys(validators).map(field => {
        return errorMessages[field].textContent;
    }).filter(error => error !== '');

    console.log(formErrors,"formErrors");

    if (formErrors.length > 0) {
        alert('Por favor, corrige los errores antes de enviar el formulario');
        return;
    }

    alert(JSON.stringify(formMap, null, 2));
    document.getElementById('success').textContent = 'Registro exitoso';
});
