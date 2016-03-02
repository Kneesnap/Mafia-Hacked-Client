/*
    Regen. it's like god mode except not
*/
var Module = require('../module.js');
var hooks = {};
hooks['position'] = (sender, data, sendMessage, targetClient) => {
	return regenPacket(sender, targetClient, data, 'position');
}
hooks['flying'] = (sender, data, sendMessage, targetClient) => {
	return regenPacket(sender, targetClient, data, 'flying');
}
hooks['position_look'] = (sender, data, sendMessage, targetClient) => {
	return regenPacket(sender, targetClient, data, 'position_look');
}
var hack = new Module({
		name: 'Regen',
		alias: ['.regen'],
		help: "Regenerate faster",
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		clientHook : hooks
})
function regenPacket(sender, targetClient, data, meta){
	if(data['onGround'] == true && hack.enabled){
		if(sender['health'] != 20 && sender['food'] >= 18){
			for(var i = 0; i < 10; i++){
				targetClient.write(meta, data);
			}
		}
	}
	return true;
}
module.exports = hack;