/*
	Log Packets.
*/
var logPacket = {};
var Module = require('../module.js');
var hack = new Module({
		name: 'LogPacket',
		alias: ['.logpacket'],
		help: "Log Packets",
		cmd : (sender, args, sendMessage) => {
			if(args.length > 1){
				if(logPacket[args[1]] != undefined){
					logPacket[args[1]] = !logPacket[args[1]];
					if(logPacket[args[1]]){
						sendMessage(sender, '&4[Mafia] &8Logging &2'+args[1]);
					}else{
						sendMessage(sender, '&4[Mafia] &8Logging &4'+args[1]);
					}
				}else{
					sendMessage(sender, '&4[Mafia] &8Logging &2'+args[1]);
					logPacket[args[1]] = true;
				}
			}else{
				sendMessage(sender, '&cUsage: /logpacket <packet>')
			}
		},
		clientHook : {
			'all' : (sender, data, meta, sendMessage) => {
				if(logPacket[meta.name] != undefined){
					if(logPacket[meta.name]){
						console.log('Packet found: '+meta.name+' C -> S')
						console.log(JSON.stringify(data));
					}
				}
				return true;
			}
		},
		serverHook : {
			'all' : (sender, data, meta) => {
				if(logPacket[meta.name] != undefined){
					if(logPacket[meta.name]){
						console.log('Packet found: '+meta.name+' S -> C')
						console.log(JSON.stringify(data));
					}
				}
				return true;
			}
		}
})

module.exports = hack;