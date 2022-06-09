const modbus = require("jsmodbus");
const SerialPort = require("serialport");

const modbusRtuLogger = async ({ adres, comport }) => {
	const promise = new Promise((resolve, reject) => {
		const log = []
		const comPort = "COM" + comport
		const socket = new SerialPort(comPort, {
			// baudRate: 9600,
			parity: "none",
			stopbits: 1,
			dataBits: 8,
		});

		const client = new modbus.client.RTU(socket, adres);

		const clientLog = async () => {
			const data = await client
				.readHoldingRegisters(8196, 8)
				.then(function (resp) {
					socket.close();
					return resp.response._body._values
				})
				.catch(function () {
					// console.error(arguments);
					socket.close();
					return []
				});
			log.push(...data)
			resolve(log);
		}

		socket.on("open", clientLog)
		socket.on("error", () => { console.error; return 404 });
	});

	let result = await promise;
	//   console.log('result', result)
	return result
};

module.exports = modbusRtuLogger;
