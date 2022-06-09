const modbus = require("jsmodbus");
const SerialPort = require("serialport");

const logger = async (adres) => {
	const promise = new Promise((resolve, reject) => {
		const log = []
	const socket = new SerialPort("COM4", {
		baudRate: 9600,
		parity: "none",
		stopbits: 1,
		dataBits: 8,
	});

	const client = new modbus.client.RTU(socket, adres);
	// socket.on('close', function () {
	//   console.log(arguments)
	// })

	const clientLog = async () => {
		const data = await client
			.readHoldingRegisters(8196, 8)
			.then(function (resp) {
				
				// console.log(now, "adres", adres, "values", resp.response._body._values);
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

	socket.on("error", () => {console.error; return 404});
	  });
	  
	  let result = await promise;
	//   console.log('result', result)
	  return result
};

module.exports = logger;
