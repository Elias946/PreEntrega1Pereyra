//imports holaasd
class User {

    constructor(name, email, age, password) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
    }
}




let users = [];
Menu();
function Menu(){
    switch(prompt("por favor ingrese una opcion\n1 --> Ingresar\n2 --> Registrarse")){
        case '1':
            Login();
            break;
        case '2':
            Register();
            alert("Resgitrado con excito!!")
            Menu();
            break;
        default:
            Menu();
    }
}

function Login(){
    let user = LoginEmailValidator(prompt("por favor ingrese el email de usuario"));
    
    let userPassword = prompt("Ingrese el password");
    
    if(user == null ){
        alert("Nombre de usuario o contraseña no validos intente nuevamente");
        Login();
    }
    if(user.password == userPassword){
        alert("Bienvenido: " + user.name)
    }else{
        alert("Nombre de usuario o contraseña no validos intente nuevamente");
        MenuErrorLogin();
    }

}

function MenuErrorLogin(){
    switch(prompt("por favor ingrese una opcion\n1 --> Reintentar\n2 --> Salir")){
        case '1':
            Login()
            break;
        case '2':
            Menu()
            break;
        default:
            MenuErrorLogin()
    }

}


function LoginEmailValidator(email){
    if(email.length == 0){
        LoginEmailValidator(prompt("el email no puede estar vacio"));
    }
    if (users.length != 0) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email)  {
                return users[i];
                
            } 
            return null;
        }
    } else {
       alert("La base de datos esta vacia por favor Registra un usuario");
       Menu();
    }
}

function Register() {

    let userName = nameValidation(prompt("por favor ingrese el nombre de usuario"));
    let userPassword = PasswordValidation(prompt("ingrese el password"));
    let userAge = AgeValidation(prompt("por favor ingrese la edad"));
    let userEmail = emailValidation(prompt("por favor ingrese el email de usuario"));

    const newUser = new User(userName,userEmail,userAge,userPassword);
    users.push(newUser);

}

function nameValidation(name) {

    if (users.length != 0) {
        for (let i = 0; i < users.length; i++) {
            while (users[i].name == name || name.length != 0) {
                name = prompt("el nombre de usuario esta vacio o ya existe\npor favor intente nuevamente")
            }
            return name;
        }
    } else {
        while (name.length == 0) {
            name = prompt("el nombre de usuario esta vacio o ya existe\npor favor intente nuevamente")
        }
        return name;
    }
}


function PasswordValidation(password) {

    while (password.length == 0) {
        password = prompt("el password no puede estar vacio \ningrese el password");
    }
    return password;
}




function AgeValidation(agestr) {
    try {
        let age = parseInt(agestr);
        if(isNaN(age)){
            AgeValidation(prompt("por favor ingrese la edad valida"));
        }
        if (age < 18) {
            AgeValidation(prompt("por favor ingrese la edad"));
        }
        return age;


    } catch (e) {
        alert("error al colocar la edad")
        AgeValidation(prompt("por favor ingrese la edad"));
    }
}

function emailValidation(email) {
    if(email.length == 0){
        emailValidation(prompt("el email del usuario no puede estar vacio\npor favor intente nuevamente"));
    }
    if (users.length != 0) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                emailValidation(prompt("ya existe un email \npor favor intente nuevamente"));
            }
            return email;
        }
    } else {
        return email;
    }
}