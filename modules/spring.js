/*
	Sprint. helps you faster from whoever you just pissed off
*/
var Module = require('../module.js');

var hack = new Module({
		name: 'Sprint',
		alias: ['.sprint'],
		help: "Run faster",
		onEnable: (sender) => {
			sender.write('entity_effect', {entityId: sender.entityId,effectId : 1,amplifier : 3	, duration : 9999999, hideParticles : true});
			sender.write('update_attributes', {entityId : sender.entityId, properties : [{key : 'generic.movementSpeed', value : 0.5}]});
		},
		onDisable: (sender) => {
			sender.write('remove_entity_effect', {entityId: sender.entityId,effectId : 1});
		},
		toggleable : true,
		serverHook: {
			'remove_entity_effect': function(sender, data, sendMessage) {
				if(data['effectId'] == 1 && hack.enabled){
					return false;
				}else{
					return true;
				}
			}
		}
})

module.exports = hack;