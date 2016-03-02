/*
	NoVelocity. Pretty much the only hack you say lag did it for.
*/
var Module = require('../module.js');
var hooks = {};
hooks['entity_velocity'] = (server, data, sendMessage, client) => {
	if(data['entityId'] == client.entityId){
		return false;
	}else{
		return true;
	}
}
var hack = new Module({
		enabled : false,
		name: 'NoVelocity',
		alias: ['.novelocity', '.nv'],
		help: "Don't get knocked back",
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		serverHook : hooks
})

module.exports = hack;