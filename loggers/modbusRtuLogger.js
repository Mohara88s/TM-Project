const modbus = require("jsmodbus");
const SerialPort = require("serialport");

const logger = () => {
	const socket = new SerialPort("COM4", {
		baudRate: 9600,
		parity: "none",
		stopbits: 1,
		dataBits: 8,
	});
	const adres = 1;

	const client = new modbus.client.RTU(socket, adres);
	// socket.on('close', function () {
	//   console.log(arguments)
	// })

	socket.on("open", function () {
		client
			.readHoldingRegisters(8196, 8)
			.then(function (resp) {
				let now = new Date();
				console.log(now, "adres", adres, "values", resp.response._body._values);
				socket.close();
			})
			.catch(function () {
				console.error(arguments);
				socket.close();
			});
	});

	socket.on("error", console.error);
};

module.exports = logger;
