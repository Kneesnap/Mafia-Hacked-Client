/*
	Nofall: if ur doing 9/11 an dun want to die, try activating this and jump
*/
var Module = require('../module.js');
var hooks = {};
hooks['position'] = (sender, data, sendMessage, targetClient) => {
	return nofallPacket(sender, targetClient, data);
}
hooks['position_look'] = (sender, data, sendMessage, targetClient) => {
	return nofallPacket(sender, targetClient, data);
}
var hack = new Module({
		name: 'Nofall',
		alias: ['.nofall'],
		help: "Prevents fall damage",
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		clientHook : hooks
})
function nofallPacket(sender, targetClient, data){
	if(hack.enabled && data['y'] <= (sender.nofallY - 2)){
		data['onGround'] = true;
	}
	if(Math.abs(data['y'] - sender.nofallY) >= 2 || sender.nofallY == undefined){
		sender.nofallY = data['y'];
	}
	return data;
}
module.exports = hack;