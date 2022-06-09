const modbusRtuLogger = require('./modbusRtuLogger')

const substationLogger = async (substation) => {
	const array = []
	for (let i = 1; i <= substation.adresses; i += 1) {
		const res = await modbusRtuLogger({ adres: i, comport: substation.comport })
		// console.log(i, res)
		let nowTime = new Date();
		array.push({ adres: i, time: nowTime, result: res })
	}
	console.log(array)
	
	return array

}

module.exports = substationLogger;
