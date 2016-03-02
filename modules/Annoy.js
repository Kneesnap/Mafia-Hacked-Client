/*
	Sneak. Even spy fox can't find you.
*/
var Module = require('../module.js');
var annoy = '';
var hack = new Module({
		name: 'Annoy',
		alias: ['.annoy'],
		help: "Annoy other players",
		cmd : (sender, args, sendMessage, targetClient) => {
			if(args.length > 1){
				annoy = args[1];
				sendMessage(sender, '&4[Mafia]&8 Now annoying &2'+args[1]);
			}else{
				if(annoy != ''){
					annoy = '';
					sendMessage(sender, '&4[Mafia]&8 Disabled annoy');
				}else{
				    sendMessage(sender, '&4[Mafia]&8 You must supply who you with to annoy');
				}
			}
		},
		onDisable: () => {},
		serverHook : {
			'chat' : (sender, data, sendMessage, targetClient) => {
				var json = JSON.parse(data['message']);
				if(json['translate'] != undefined && json['translate'] == 'chat.type.text'){
					if(json['with'][0]['text'].indexOf(annoy) != -1 && annoy != ''){
						sender.write('chat', {message : json['with'][1]})
					}
				}
			}
		},
})

module.exports = hack;