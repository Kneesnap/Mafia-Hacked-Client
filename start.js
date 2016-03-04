console.log('Starting Client')
var KneeProx = require('./base.js')
var fs = require('fs');
/*
	Make a Favicon for the client
*/
var favicon = "data:image/png;base64,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";
var version = '1.9'
var allowedplayers = ['']
try{
    var settings = require('./config.json')
}catch(e){
    throw new Error('config.json not found!')
}
/*
	Make some settings file/loader
*/
var mcProxy = new KneeProx({
	username : config.username, //Put what you use to login to minecraft here. Email/Username
	password : config.password, //Put your password here. This is required because otherwise session stealers would be possible.
	'online-mode': true,
	'max-players' : 1,
	serverPort: config.serverIp,
	serverHost: config.ip,
	proxyPort: 25565,
	version: version,
	keepAlive : false,
	motd: '\u00A71[\u00A76Mafia Client\u00A71]\u00A74 Version: '+version+' by Kneesnap',
	favicon : favicon,
	clientVersion: 'v1.0'
});
var clientHook  = {'chat' : [], 'login' : []};
var serverHook = {};
var entities = [];
mcProxy.loginServerEvent = loginEvent;
mcProxy.clientPacketEvent = clientPacketEvent;
mcProxy.serverPacketEvent = serverPacketEvent;
mcProxy.beforeLoginEvent = beforeLoginEvent;
mcProxy.commands = require('./modules.js').loadHacks;
serverHook['named_entity_spawn'] = [];
mcProxy.commands.forEach(function(a){
	Object.keys(a['serverHook']).forEach(function(b){
		if(serverHook[b]==undefined){
			serverHook[b] = [];
		}
		serverHook[b].push(a['serverHook'][b])
	})
	Object.keys(a['clientHook']).forEach(function(b){
		if(clientHook[b]==undefined){
			clientHook[b] = [];
		}
		clientHook[b].push(a['clientHook'][b])
	})
});

clientHook['chat'].push((sender, data, sendMessage, targetClient) => {
	console.log('<'+sender.username+'> '+data.message);
	return true;
})
clientHook['position'].push((sender, data, sendMessage, targetClient) => {
	setPos(sender, data, 'position');
	return true;
});
clientHook['position_look'].push((sender, data, sendMessage, targetClient) => {
	setPos(sender, data, 'position_look');
	return true;
});
clientHook['login'].push((sender, data, sendMessage, targetClient) => {
	targetClient.write('settings', {locale : 'en_US', viewDistance : 0, chatFlags : 0, chatColors : true, skinParts : 63, mainHand : 1})
	return true;
})
serverHook['update_health'].push((sender, data, sendMessage, targetClient) => {
	targetClient.health = data['health'];
	targetClient.food = data['food'];
	return true;
})
serverHook['named_entity_spawn'].push((sender, data, sendMessage, targetClient) => {
	entities.push(data);
})

function setPos(sender, data, meta){
	sender.X = data['x']
	sender.Y = data['y']
	sender.Z = data['z']
	if(meta == 'position_look'){
		sender.PITCH = data['pitch'];
		sender.YAW = data['yaw'];
	}
}
function sendMessage(sender, message){
	mcProxy.sendMessage(sender, message);
}
function loginEvent(client, meta, data){
	client.entityId = data['entityId'];
	console.log(client.username+' joined the game ('+client.socket.remoteAddress+')');
	mcProxy.commands.forEach(function(a){
		if(a.enabled){
			a['onEnable'](client, data, mcProxy.sendMessage);
		}
	})
	sendMessage(client, '&4[Mafia]&8 Connected using Mafia &6v1.0');
}

function beforeLoginEvent(client){
	return true;
}
function clientPacketEvent(sender, data, meta, targetClient){
	var send = true;
	if(clientHook['all'] != undefined){
		clientHook['all'].forEach(function(a){
			var g = a(sender, data, meta, targetClient);
			if(send != false){
				if(typeof g==='object'){
					send = g;
					data = g;
				}else{
					if(typeof send == 'boolean'){
						send = g;
					}
				}
			}
		})
	}
	if(clientHook[meta.name] != undefined){
		clientHook[meta.name].forEach(function(a){
			var g = a(sender, data, sendMessage, targetClient);
			if(send != false){
				if(typeof g === 'object'){
					send = g;
					data = g;
				}else{
					if(typeof send == 'boolean'){
						send = g;
					}
				}
			}
		})
	}
	return send;
}
function serverPacketEvent(targetClient, data, meta, client){
	var send = true;
	if(clientHook['all'] != undefined){
		clientHook['all'].forEach(function(a){
			var g = a(client, data, meta, targetClient);
			if(send != false){
				if(typeof g==='object'){
					send = g;
					data = g;
				}else{
					if(typeof send == 'boolean'){
						send = g;
					}
				}
			}
		})
	}
	if(serverHook[meta.name] != undefined){
		serverHook[meta.name].forEach(function(a){
			var g = a(targetClient, data, sendMessage, client)
				if(typeof g === 'object'){
					send = g;
					data = g;
				}else{
					if(typeof send == 'boolean' && send){
						send = g;
					}
				}
		})
	}
	return send
}
