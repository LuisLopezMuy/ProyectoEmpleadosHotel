{//Crear los usuarios o conectarse a
    var users = JSON.parse(localStorage.getItem("Users"))

    if (users == null || users == "") {
        users = [{
            nombre: "Luis",
            apellido: "López",
            telefono: "23392300",
            direccion: "Ciudad Guatemala",
            correo: "luislopez@hotel.com",
            fechaNacimiento: "2006-01-15",
            contrasena: "admin",
            rol: "Administrador"
        }]
    }
}

var rolActual = sessionStorage.getItem("rolActual")
var nombreActual = sessionStorage.getItem("nombreActual")

class nuevoUsuario {//clase del usuario
    nombre;
    apellido;
    telefono;
    direccion;
    correo;
    fechaNacimiento;
    contrasena;
    rol;

    constructor(nombre, apellido, telefono, direccion, correo, fechaNacimiento, contrasena, rol) {
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
        this.direccion = direccion
        this.correo = correo
        this.fechaNacimiento = fechaNacimiento
        this.contrasena = contrasena
        this.rol = rol
    }
}

{//login
    let contarIntentos = 0
    let correcto = false
    function ingresar() {
        let usuario = document.getElementById("usuario")
        let contra = document.getElementById("contra")
        let mensaje = document.getElementById("mensaje")
        let botonIngresar = document.getElementById("botonIngresar")

        for (let i = 0; i < users.length; i++) {
            if (usuario.value == users[i].correo && contra.value == users[i].contrasena) {
                sessionStorage.setItem("rolActual", users[i].rol)
                sessionStorage.setItem("nombreActual", users[i].nombre + " " + users[i].apellido)
                location.href = "usuarios.html"
                correcto = true
                break
            }
        }
        if (!correcto) {
            contarIntentos++
            if (contarIntentos == 3) {
                alert("Demasiados intentos realizados \nSe bloquó el Log In")
                usuario.disabled = "true"
                usuario.value = ""
                contra.disabled = "true"
                contra.value = ""
                botonIngresar.disabled = "true"
                mensaje.textContent = ""
            } else {
                mensaje.textContent = "Usuario y contraseña incorrectos"
            }
        }
    }
}

{//Botones para cambiar pagina
    function cancelar() {
        location.href = "usuarios.html"
    }

    function botonModificar() {
        if (sessionStorage.getItem("seleccionEmpleado") === "null") {
            alert("Por favor selecccione un empleado para continuar")
        } else {
            location.href = "modificar.html"
        }
    }

    function botonEliminar() {
        if (sessionStorage.getItem("seleccionEmpleado") === "null") {
            alert("Por favor selecccione un empleado para continuar")
        } else {
            location.href = "eliminar.html"
        }
    }

    function botonVer() {
        if (sessionStorage.getItem("seleccionEmpleado") === "null") {
            alert("Por favor selecccione un empleado para continuar")
        } else {
            location.href = "ver.html"
        }
    }
}

{//Agregar nuevo Usuario
    var nombre = document.getElementById("nombre")
    var apellido = document.getElementById("apellido")
    var telefono = document.getElementById("telefono")
    var direccion = document.getElementById("direccion")
    var correo = document.getElementById("correo")
    var fechaNacimiento = document.getElementById("fecha")
    var contrasena = document.getElementById("contraN")
    var rol = document.getElementById("rol")

    function agregar() {
        if (nombre.value == "" || apellido.value == "" || telefono.value == "" || direccion.value == "" || correo.value == "" || fechaNacimiento.value == "" || contrasena.value == "" || rol.value == "") {
            alert("Por favor llene todos los campos")
        } else {
            let x = new nuevoUsuario(nombre.value, apellido.value, telefono.value, direccion.value, correo.value, fechaNacimiento.value, contrasena.value, rol.value)
            users.push(x)
            localStorage.setItem("Users", JSON.stringify(users))
            location.href = "agregar.html"
            alert("Usuario agregado correctamente \nPuede seguir agregando usuarios")
        }

    }
}

{//Cargar datos
    let index = sessionStorage.getItem("seleccionEmpleado")
    function cargarDatos() {
        nombre.value = users[index].nombre
        apellido.value = users[index].apellido
        telefono.value = users[index].telefono
        direccion.value = users[index].direccion
        correo.value = users[index].correo
        fechaNacimiento.value = users[index].fechaNacimiento
        contrasena.value = users[index].contrasena
        rol.value = users[index].rol
    }
}

{//Modificar
    function modificar() {
        let index = sessionStorage.getItem("seleccionEmpleado")

        if (nombre.value == "" || apellido.value == "" || telefono.value == "" || direccion.value == "" || correo.value == "" || fechaNacimiento.value == "" || contrasena.value == "" || rol.value == "") {
            alert("Por favor llene todos los campos")
        } else {
            alert("Usuario modificado correctamente")

            let x = new nuevoUsuario(nombre.value, apellido.value, telefono.value, direccion.value, correo.value, fechaNacimiento.value, contrasena.value, rol.value)
            users[index] = x
            localStorage.setItem("Users", JSON.stringify(users))

            location.href = "usuarios.html"
        }
    }
}

{//Eliminar
    function eliminar() {
        if (confirm("¿Está seguro de eliminar este usuario?")) {
            let index = sessionStorage.getItem("seleccionEmpleado")
            users.splice(index, 1)
            localStorage.setItem("Users", JSON.stringify(users))
            location.href = "usuarios.html"
        }
    }

}

{//Mostrar la tabla
    function mostrarUsuarios() {
        if (rolActual != "Administrador") {
            let oculto1 = document.getElementById("oculto1")
            let oculto2 = document.getElementById("oculto2")
            let oculto3 = document.getElementById("oculto3")
            oculto1.style.visibility = "hidden"
            oculto2.style.visibility = "hidden"
            oculto3.style.visibility = "hidden"
        }



        let usuarioActual = document.getElementById("nombreActual")
        usuarioActual.textContent = "Usuario: " + nombreActual



        sessionStorage.setItem("seleccionEmpleado", null)
        let tablaUsuarios = document.getElementById("tablaUsuarios")

        for (let i = 0; i < users.length; i++) {

            tablaUsuarios.innerHTML += `<tr id="r${i}" onclick="seleccionarEmpleado(${i})" onmouseover="resaltar(${i})" onmouseout="noResaltar(${i})">
            <td>${i + 1}</td>
            <td>${users[i].nombre}</td>
            <td>${users[i].apellido}</td>
            <td>${users[i].rol}</td>
            <td>${users[i].correo}</td>
            <td>${users[i].telefono}</td>
        </tr>`
        }
    }
}

{//Funciones varias
    function seleccionarEmpleado(x) {//Asigna el número de empleado a una variable para utilizar en otras funciones
        let selecccionEmpleado = sessionStorage.getItem("seleccionEmpleado")
        if (selecccionEmpleado == "null") {
            selecccionEmpleado = 0
        }

        let registroAnterior = document.getElementById(`r${selecccionEmpleado}`)
        registroAnterior.style.backgroundColor = "white"

        let registro = document.getElementById(`r${x}`)
        registro.style.backgroundColor = "#CCCCCC"
        sessionStorage.setItem("seleccionEmpleado", x)
    }

    function resaltar(x) {//Resaltar registro
        if (x != sessionStorage.getItem("seleccionEmpleado")) {
            let registro = document.getElementById(`r${x}`)
            registro.style.backgroundColor = "#E5E5E5"
        }
    }

    function noResaltar(x) {//Dejar de resaltar registro
        if (x != sessionStorage.getItem("seleccionEmpleado")) {
            let registro = document.getElementById(`r${x}`)
            registro.style.backgroundColor = "white"
        }
    }
}