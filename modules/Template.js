// Template for hacks.

var Module = require('../module.js');
// var hooks = {};
var hack = new Module({
		name: '.test',
		alias: ['.test', '.mafia'], // different names that trigger this command.
		help: 'Example Command',  //idk what help is
		cmd: (sender, args, sendMessage) => {
			sendMessage(sender, '&4[Mafia Client v1.0]')  //Some example chat message sent to the sender
			sendMessage(sender, '&8Written by Kneesnap')
			sendMessage(sender, '&8Using node-minecraft-protocol')
		},
		//clientHook : hooks
		loginHook: (sender, sendMessage) => {
			sendMessage(sender, '&4[Mafia] &8You are running Mafia Client! Written by Kneesnap')
		}
})

module.exports = hack
