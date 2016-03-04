/*
	Gamemode logger. Be watcheful of gamemodes
*/
var Module = require('../module.js');
var hooks = {};
var players = {};
var ids = {};
hooks['player_info'] = (sender, data, sendMessage, targetClient) => {
	var name = data.data[0].name
	var uuid = data.data[0].UUID
	if(name != undefined){
		players[uuid] = name
	}
    if (data['action'] == 1 && hack.enabled && data['data'][0]['gamemode'] != undefined) {
    	var name = players[uuid];
    	if (name != undefined) {
    		sendMessage(targetClient, '&4[Mafia]&6 '+name+'&8 is now in gamemode &6'+data['data'][0]['gamemode'])
    	}
    }
}
var hack = new Module({
		name: 'Gamemode logger',
		enabled : true,
		alias: ['.gmlog','.gamemodelog'],
		help: "Show gamemode switches",
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		serverHook : hooks
})

module.exports = hack;
