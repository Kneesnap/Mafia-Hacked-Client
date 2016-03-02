/*
    FastUse. become an american in 2 seconds or be a legolas wannabe
*/
var Module = require('../module.js');
var hooks = {};
hooks['block_place'] = (sender, data, sendMessage, targetClient) => {
	return fastPacket(sender, targetClient, data, 'block_place');
}

var hack = new Module({
		name: 'FastUse',
		alias: ['.fastuse'],
		help: "Eat food and use bows instantly",
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		clientHook : hooks
})
function fastPacket(sender, targetClient, data, meta){
	if(hack.enabled && data['direction'] == -1){
			targetClient.write(meta, data);
			var send = 40;
			if(data['heldItem']['blockId'] == 261){
				send = 20;
			}
			for(var i = 0; i < send; i++){
				targetClient.write('flying', {onGround : true});
			}
			targetClient.write('block_dig', {"status":5,"location":{"x":0,"y":0,"z":0},"face":0});
			return false;
	}
	return true;
}
module.exports = hack;