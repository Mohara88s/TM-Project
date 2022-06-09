require('dotenv').config()
const app = require('../app')
const modbusRtuLogger = require('../loggers/modbusRtuLogger')


const { PORT = 3000 } = process.env

app.listen(PORT)
console.log(`Server running. Use our API on port: ${PORT}`)


const stationLog = async (max) => {
  const array = []
 
  for (let i = 1; i <= max; i += 1) {

    const res = await modbusRtuLogger(i)
    
    // console.log(i, res)
    let nowTime = new Date();
    array.push({adres:i, time:nowTime, result:res})
  }
  console.log(array)
}

setInterval(stationLog, 2000, 2)

