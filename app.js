const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(cors())
app.use('/', express.static(__dirname + '/src'))
app.use(express.json())

let conexion = mysql.createConnection({
  host: 'localhost',
  database: 'cursos',
  user: 'root',
  password: ''
})

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

conexion.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log('golazo')
  }
})

app.get('/apis', (req, res) => {
  conexion.query('SELECT * from cursa', (error, respuesta) => {

    if (error) {
      throw error;
    }

    if (!error) {
      res.send(respuesta)
    }
  })

  conexion.end()
})

app.post('/apis', (req, res) => {
  if (req.body) {
  console.log('sape')
  } else {
    console.log('nosape')
  }
  const {Nombre, Apellido, Cedula, Nacimiento} = req.body

  conexion.query(`INSERT INTO cursa (nombre, apellido, cedula, nacimiento) VALUES ('${Nombre}', '${Apellido}', '${Cedula}', '${Nacimiento}' )`, (error, respuesta) => {

    if (error) {
      console.log(error)
    } 
    
    if (!error) {
      console.log(req.body)
    }

  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})