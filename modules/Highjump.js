// Highjump - jump higher

var Module = require('../module.js');

var hack = new Module({
		name: 'HighJump',
		alias: ['.highjump'],
		help: "Jump higher",
		onEnable: (sender) => {
			sender.write('entity_effect', {entityId: sender.entityId,effectId : 8,amplifier : 2, duration : 9999999, hideParticles : true});
		},
		onDisable: (sender) => {
			sender.write('remove_entity_effect', {entityId: sender.entityId,effectId : 8});
		},
		toggleable : true,
		serverHook: {
			'remove_entity_effect': function(sender, data, sendMessage) {
				if(data['effectId'] == 8 && hack.enabled){
					return false;
				}else{
					return true;
				}
			}
		}
})

module.exports = hack;
