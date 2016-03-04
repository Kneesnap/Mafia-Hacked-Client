// Fly. Impersonate a bird or a plane.

var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: 'Fly',
		alias: ['.fly'],
		help: "Soar through the sky!",
		onEnable: (sender, args, sendMessage) => {
			sender.write('abilities', {flyingSpeed : 0.05,walkingSpeed : 0.1, flags: 15})
		},
		onDisable: (sender, args, sendMessage) => {
			sender.write('abilities', {flyingSpeed : 0.05,walkingSpeed : 0.1, flags: 0})
		},
		toggleable : true
})

module.exports = hack;
