// Fullbright/Gamma mod. Pretty much the most useful hack ever.

var Module = require('../module.js');

var hack = new Module({
		name: 'Fullbright',
		alias: ['.fullbright', '.fb'],
		help: "No need for torches",
		onEnable: (sender) => {
			sender.write('entity_effect', {entityId: sender.entityId,effectId : 16,amplifier : 1, duration : 9999999, hideParticles : true});
		},
		onDisable: (sender) => {
			sender.write('remove_entity_effect', {entityId: sender.entityId,effectId : 16});
		},
		toggleable : true,
		serverHook: {
			'remove_entity_effect': function(sender, data, sendMessage) {
				if(data['effectId'] == 16 && hack.enabled){
					return false;
				}else{
					return true;
				}
			}
		}
})

module.exports = hack
