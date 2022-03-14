const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const modbusRtuLogger = require('./loggers/modbusRtuLogger')


const app = express()
const stationsObjects= [
  {
    comPort:4,
    adresAmount:2
  },
  {
    comPort:10,
    adresAmount:1
  },
]
setInterval(modbusRtuLogger, 3000, stationsObjects)

// setInterval(modbusRtuLogger, 3000, 4, 2)
// setInterval(modbusRtuLogger, 3000, 10, 1)
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
