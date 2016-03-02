/*
	Sneak. Even spy fox can't find you.
*/
var Module = require('../module.js');
var hooks = {};
hooks['entity_action'] = (sender, data) => {
	if(data['actionId'] <= 1 && hack.enabled){
		return false;
	}
	return true;
}
var hack = new Module({
		name: 'Sneak',
		alias: ['.sneak'],
		help: "Like you're always holding shift",
		onEnable: (sender, args, sendMessage, targetClient) => {
			targetClient.write('entity_action', {entityId : sender.entityId, actionId : 0, jumpBoost : 0 })
		},
		onDisable: (sender, args, sendMessage, targetClient) => {
			targetClient.write('entity_action', {entityId : sender.entityId, actionId : 1, jumpBoost : 0})
		},
		clientHook : hooks,
		toggleable : true
})

module.exports = hack;