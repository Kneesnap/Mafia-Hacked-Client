/*
	If you have a bad attention span, this can help.
*/
var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: 'Enabled',
		alias: ['.enabled'], 
		help: "List enabled hacks",  
		cmd: (sender, args, sendMessage, targetClient, cmds) => {
			sendMessage(sender,'&4[Mafia]&8 List of enabled hacks:');
			cmds.forEach(function(a){ 
				if(a.enabled){
					sendMessage(sender, '&4[Mafia]&2 '+a['alias'][0]+'&8 - '+a['alias'][0]);
				}
			})
		}
})

module.exports = hack;