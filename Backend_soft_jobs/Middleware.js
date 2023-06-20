const jwt = require("jsonwebtoken")

const reportarRegistro = async(req, res, next) => {
    console.log(`${new Date().toLocaleString("es-ES")}`)
    console.log("Registro de nuevo usuario")
    console.log(`Metodo: ${req.method} a la ruta ${req.path}`)
    next()
}

const reportarVerificacionCredenciales = async(req, res, next) => {
    console.log(`${new Date().toLocaleString("es-ES")}`)
    console.log("Intento de inicio de sesión")
    console.log(`Metodo: ${req.method} a la ruta ${req.path}`)
    next()
}

const reportarInicioSesion = async(req, res, next) => {
    console.log(`${new Date().toLocaleString("es-ES")}`)
    console.log("Inicio de sesión")
    console.log(`Metodo: ${req.method} a la ruta ${req.path}`)
    next()
}

const isAuth = async(req, res, next) => {
    const authorization = req.header("Authorization")
    const token = authorization.split("Bearer ")[1]
    jwt.verify(token, process.env.SECRET_KEY)
    req.email = jwt.decode(token)
    next()
}

module.exports = {reportarRegistro, reportarInicioSesion, reportarVerificacionCredenciales, isAuth}