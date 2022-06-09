require('dotenv').config()
const substationsOperations = require("../operations/substations")
const app = require('../app')
const substationsHandler = require('./substationsHandler')

const { PORT = 3000 } = process.env


console.log(`Server running. Use our API on port: ${PORT}`)

substationsOperations.listSubstations().then((data) => {
    app.listen(PORT)
    console.log('data', data)
    substationsHandler(data)
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })


