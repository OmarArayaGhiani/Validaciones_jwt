const {Pool} = require("pg")
const bcrypt = require('bcryptjs')

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true,
})

const addUser = async(usuario) => {
    const {email, password, rol, lenguage} = usuario
    const passwordEncrypted = bcrypt.hashSync(password)
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
    const values = [email, passwordEncrypted, rol, lenguage]
    await pool.query(consulta, values)
}

const verificarCredenciales = async(login) => {
    const {email, password} = login
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const {rows: [usuario], rowCount} = await pool.query(consulta, values)
    if(!rowCount) throw {code: 404, message: "Usuario o contraseña incorrecta"}
    const {password: passwordEncrypted} = usuario
    const passwordSuccess = bcrypt.compareSync(password, passwordEncrypted)
    if(!passwordSuccess) throw {code: 404, message: "Usuario o contraseña incorrecta"}
}

const getUser = async(email) => {
    const consulta = ("SELECT email, rol, lenguage FROM usuarios WHERE email = $1")
    const values = [email]
    const usuario = await pool.query(consulta, values)
    return(usuario.rows[0])
}

module.exports = {addUser, verificarCredenciales, getUser}