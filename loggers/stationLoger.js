const modbusRtuLogger = require('./modbusRtuLogger')

const stationLoger = async (max) => {
	const array = []
	for (let i = 1; i <= max; i += 1) {
		const res = await modbusRtuLogger(i)
		// console.log(i, res)
		let nowTime = new Date();
		array.push({ adres: i, time: nowTime, result: res })
	}
	console.log(array)
}

module.exports = stationLoger;
