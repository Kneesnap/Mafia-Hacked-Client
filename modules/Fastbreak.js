/*
	Fastbreak. break faster
*/
var Module = require('../module.js');
var hooks = {};
hooks['block_dig'] = (sender, data, sendMessage, targetClient) => {
	if(hack.enabled && data['status'] == 0){
		targetClient.write('block_dig', {status : 0, location : data['location'], face : data['face']})
		targetClient.write('block_dig', {status : 2, location : data['location'], face : data['face']})
		return false;
	}
	return true;
}
var hack = new Module({
		name: 'Fastbreak',
		alias: ['.fastbreak'],
		help: "Break blocks faster",
		onEnable: (sender) => {sender.write('entity_effect', {entityId: sender.entityId,effectId : 3, amplifier : 2, duration : 9999999, hideParticles : true});},
		onDisable: (sender) => {sender.write('remove_entity_effect', {entityId: sender.entityId,effectId : 3});},
		toggleable : true,
		clientHook : hooks,
		serverHook : {
			'remove_entity_effect' : (sender, data) =>{
				if(hack['enabled'] && data['effect_id'] == 3){
					return false;
				}else{
					return true;
				}
			}
		}
})

module.exports = hack;