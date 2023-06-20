require("dotenv").config()
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express()
const {addUser, verificarCredenciales, getUser} = require("./Consultas")
const {reportarRegistro, reportarInicioSesion, reportarVerificacionCredenciales, isAuth} = require("./Middleware")

app.use(express.json())
app.use(cors())

app.post("/usuarios", async (req, res, next) => {
  try {
    const usuario = req.body
    await addUser(usuario)
    res.send("Usuario registrado")
    next()
  } catch (error) {
    res.status(500).send(error.message)
  }
}, reportarRegistro)

app.post("/login", reportarVerificacionCredenciales, async(req, res) => {
  try{
    const login = req.body
    await verificarCredenciales(login)
    const token = jwt.sign(login.email, process.env.SECRET_KEY)
    res.send(token)
  }
  catch(error){
    res.status(500).send(error.message)
  }
})

app.get("/usuarios", isAuth, async(req, res, next) => {
  try{
    const user = await getUser(req.email)
    res.send(user)
    next()
  }
  catch(error){
    res.status(500).send(error.message)
  }
}, reportarInicioSesion)

app.listen(process.env.PORT, console.log("Server up"))