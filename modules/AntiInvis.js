// AntiInvis. Show people who drink random animal parts + minerals they brewed

var Module = require('../module.js')

var hack = new Module({
		name: 'AntiInvis',
		alias: ['.av','.antiinvis'],
		help: "Show invisible players",
		onEnable: () => {},
		onDisable: () => {},
		toggleable: true,
		serverHook: {
			'entity_effect': (sender, data, sendMessage, targetClient) => {
				if(data['entityId'] != sender['entityId'] && hack.enabled && data['effectId'] == 14){
					return false
				}
				return true
			}
		}
})

module.exports = hack
