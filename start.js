// start.js

console.log('Starting Client')

var fs = require('fs')
var Prox = require('./proxy.js')

var version = '1.9'

try {
	var config = require('./config.json')
} catch (e) {
	throw new Error('Config file could not be loaded!')
}

var mcProxy = new Prox({
	username : config.username,
	password : config.password,
	serverHost: config.ip,
	serverPort: config.port,
	'online-mode': false,
	'max-players': 1,
	proxyPort: 25565,
	version: version,
	keepAlive: false,
	motd: `\u00A71[\u00A76Mafia Client\u00A71]\u00A74 Version: ${version} by Kneesnap`,
	clientVersion: 'v1.0'
})

var clientHook  = {
	chat: [],
	login: [],
	chat: [],
	position: [],
	position_look: [],
	login: []
}

var serverHook = {
	update_health: [],
	named_entity_spawn: []
}

var entities = []
mcProxy.loginServerEvent = loginEvent
mcProxy.clientPacketEvent = clientPacketEvent
mcProxy.serverPacketEvent = serverPacketEvent
mcProxy.beforeLoginEvent = beforeLoginEvent
mcProxy.commands = fs.readdirSync('./modules/').map((file) => require(`./modules/${file}`))
mcProxy.commands.forEach((a) => {
		Object.keys(a.serverHook).forEach((b) => {
			if(serverHook[b] === undefined){
				serverHook[b] = []
			}
			serverHook[b].push(a.serverHook[b])
		})
		Object.keys(a.clientHook).forEach((b) => {
			if (clientHook[b] === undefined) {
				clientHook[b] = []
			}
			clientHook[b].push(a.clientHook[b])
		})
	})

clientHook.chat.push((sender, data, sendMessage, targetClient) => {
	console.log(`<${sender.username}> ${data.message}`)
	return true
})

clientHook.position.push((sender, data, sendMessage, targetClient) => {
	setPos(sender, data, 'position')
	return true
})

clientHook.position_look.push((sender, data, sendMessage, targetClient) => {
	setPos(sender, data, 'position_look')
	return true
})

clientHook.login.push((sender, data, sendMessage, targetClient) => {
	targetClient.write('settings', {
		locale: 'en_US',
		viewDistance: 0,
		chatFlags: 0,
		chatColors: true,
		skinParts: 63,
		mainHand : 1
	})
	return true
})

serverHook.update_health.push((sender, data, sendMessage, targetClient) => {
	targetClient.health = data.health
	targetClient.food = data.food
	return true
})

serverHook.named_entity_spawn.push((sender, data, sendMessage, targetClient) => {
	entities.push(data)
})

function setPos(sender, data, meta){
	sender.X = data.x
	sender.Y = data.y
	sender.Z = data.z
	if (meta === 'position_look') {
		sender.PITCH = data.pitch
		sender.YAW = data.yaw
	}
}

function sendMessage(sender, message){
	mcProxy.sendMessage(sender, message)
}

function loginEvent(client, meta, data){
	client.entityId = data.entityId
	console.log(`${client.username} joined the game (${client.socket.remoteAddress})`)
	mcProxy.commands.forEach(function(a){
		if(a.enabled){
			a.onEnable(client, data, mcProxy.sendMessage)
		}
	})
	sendMessage(client, '&4[Mafia]&8 Connected using Mafia &6v1.0')
}

function beforeLoginEvent(client){
	return true
}

function clientPacketEvent(sender, data, meta, targetClient){
	var send = true
	if (clientHook['all'] !== undefined) {
		clientHook['all'].forEach(function(a) {
			var g = a(sender, data, meta, targetClient)
			if (send !== false){
				if (typeof g==='object')  {
					send = g
					data = g
				}else{
					if (typeof send == 'boolean') {
						send = g
					}
				}
			}
		})
	}
	if (clientHook[meta.name] !== undefined) {
		clientHook[meta.name].forEach(function(a){
			var g = a(sender, data, sendMessage, targetClient)
			if (send !== false) {
				if (typeof g === 'object') {
					send = g
					data = g
				} else {
					if (typeof send == 'boolean') {
						send = g
					}
				}
			}
		})
	}
	return send
}

function serverPacketEvent(targetClient, data, meta, client){
	var send = true
	if (clientHook['all'] !== undefined) {
		clientHook['all'].forEach(function(a){
			var g = a(client, data, meta, targetClient)
			if (send !== false) {
				if (typeof g==='object') {
					send = g
					data = g
				} else {
					if(typeof send == 'boolean'){
						send = g
					}
				}
			}
		})
	}
	if (serverHook[meta.name] !== undefined) {
		serverHook[meta.name].forEach((a) => {
			var g = a(targetClient, data, sendMessage, client)
				if (typeof g === 'object') {
					send = g
					data = g
				} else {
					if (typeof send == 'boolean' && send) {
						send = g
					}
				}
		})
	}
	return send
}
