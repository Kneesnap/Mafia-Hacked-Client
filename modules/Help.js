/*
	Help. I need somebody. Help! Not just anybody.
	Hello Freddy Mercury, my name is Tom.
*/
var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: 'Help',
		alias: ['.help'], 
		help: "Help Me",  
		cmd: (sender, args, sendMessage, targetClient, cmds) => {
			cmds.forEach(function(a){ 
				sendMessage(sender, '&4[Mafia]&8 '+a['alias'][0]+' - '+a['help'])
			})
		}
})

module.exports = hack;