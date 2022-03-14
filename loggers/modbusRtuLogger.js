const { array } = require("joi");
const modbus = require("jsmodbus");
const SerialPort = require("serialport");
const dataArray = []

const loggerO = (stationsObjects) => {
	dataArray.length = 0
	stationsObjects.map(object=>{
		const {comPort, adresAmount} = object
		for (adres = 1; adres <= adresAmount; ++adres) {
			setTimeout(logger, adres*500, adres, comPort)
			}
			setTimeout(()=>{console.log('data', dataArray)}, adres*500+500, adres)

	})

	// for (adres = 1; adres <= adresAmount; ++adres) {
	// setTimeout(logger, adres*500, adres, comPort)
	// }
	// setTimeout(()=>{console.log('data', dataArray)}, adres*500+500, adres)
	
	
}


const logger = (adres, comPort) => {
	// console.log('port=', comPort)
	const socket = new SerialPort("COM"+comPort, {
		baudRate: 9600,
		parity: "none",
		stopbits: 1,
		dataBits: 8,
	});
	socket.on("open", () => {
		const client = new modbus.client.RTU(socket, adres);
		client
			.readHoldingRegisters(8196, 8)
			.then((resp) => {
				let now = new Date();
				// console.log(now, "adres", adres, "values", resp.response._body._values);
				dataArray.push(...resp.response._body._values)
				socket.close()
			})
			.catch(function () {
				console.error(arguments);
				socket.close()
			})
		})
	socket.on("error", ()=>{
		console.error
		dataArray.push(...[3,3,3,3,3,3,3,3])
	});
};

module.exports = loggerO;
