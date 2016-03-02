/*
	Stop. Idk, maybe you should try it after you get electric chair'd.
*/
var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: '.stop',
		alias: ['.stop'],
		help: "Stops the proxy",
		cmd: (sender, args, sendMessage) => {
			process.exit(0);
		},
})

module.exports = hack;