//imports
import {user as User} from './User.js'
import {product as Product } from './Products.js'
import {myCheck as myCheck} from './MyCheck.js'
let users = [];
let  myCarr = [];
let  listado = [];
const product1 = new Product(1,'laptop',305, 10)
const product2 = new Product(2,'TV LG', 500, 5)
const product3 = new Product(3,'Iphone 14', 1000,3)


listado.push(product1);
listado.push(product2);
listado.push(product3);

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
        MenuLogin()
    }else{
        alert("Nombre de usuario o contraseña no validos intente nuevamente");2
        MenuErrorLogin();
    }

}

function MenuLogin(){
    switch(prompt("por favor ingrese una opcion\n1 --> Ver Listado de Productos\n2 --> Comprar Productos\n3 --> Mi Carrito")){
        case '1':
            ProductList()
            break;
        case '2':
            BuyProducts()
            break;
        case '3':
            MyCar();
            MenuLogin();
            break;
        default:
            MenuErrorLogin()
    }

}
function MyCar(){
    let strListado  = '';
    let total = 0;
    myCarr.forEach(function (i){
        strListado += 'Nombre: '+String(i.product.name) +' Precio: '+i.product.price+' Qantidad: '+String(i.quantity)+' SubTotal: '+  +String(i.subTotal)+'\n'
        total += i.subTotal;
     })
    alert("Los Products Son\n" + strListado+'\n-------------------------\n Total: '+ total)
}
function BuyProducts(){
    let Product = ValidarProduct(prompt('Por Favor ingrese la id del producto'))
    let Quantity = ValidarQuantity(prompt('Por Favor ingrese la cantidad que desea comprar'),Product)
    let subTotal = 0;
    subTotal += Product.price * Quantity;
    let check = new myCheck(Product,Quantity,subTotal)
    myCarr.push(check);
    alert("Guardado Con exito")
    MenuLogin();
}

function ValidarProduct(idStr){

    let id = parseInt(idStr);
    if(isNaN(id)){
        ValidarProduct(prompt('Por Favor ingrese la id del producto valida'))
    }

    const item = listado.find((p) => p.id === id);

    if( typeof item === 'undefined'){
        ValidarProduct(prompt('Por Favor ingrese la id del producto valida'))
    }
    return item;

}
function ValidarQuantity(QuantityStr,product){
    let Quantity = parseInt(QuantityStr);
    if(isNaN(Quantity)){
        ValidarQuantity(prompt('Por Favor ingrese una Cantidad de Stock Valida'), product)
    }
    if(Quantity > product.stock){
        ValidarQuantity(prompt(`No tenemos esa cantidad de productos, el maximo de stock en este momento es:  ${product.stock} por favor intente nuevamente`),product)
    }
    return Quantity;
}
function ProductList(){
   
    let strListado  = '';
    listado.forEach(function (i){
       strListado += 'id: '+String(i.id) +' Nombre: '+i.name+' Precio: $'+String(i.price)+' Stock: '+String(i.stock)+'\n'
    })
    alert("Los Products Son\n" + strListado)
    MenuLogin()
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