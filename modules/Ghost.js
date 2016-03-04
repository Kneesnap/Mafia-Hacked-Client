/*
    ghost. not like ghost clients. ghost clients suck
*/
var Module = require('../module.js')
var hack = new Module({
		name: 'Ghost',
		enabled : true,
		alias: ['.ghost'],
		help: 'Don\'t die.',
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		serverHook : {
			'update_health': (sender, data, sendMessage, targetClient) => {
				if (data.health < 2 && hack.enabled) {
					data.health = 20
					data.food = 20
					return data
				} else {
					return true
				}
			}
		}
})
module.exports = hack
