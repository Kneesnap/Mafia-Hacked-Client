// proxy.js

'use strict';

var mc = require('node-minecraft-protocol');
var version = '';
var lastServerMeta;
var lastClientMeta;
class Proxy extends mc.createServer {
	constructor(options) {
		super({
			'online-mode': options['online-mode'],
			port: options.proxyPort,
			keepAlive: options.keepAlive,
			version: options.version,
			favicon: options.favicon,
			motd: options.motd,
			'max-players': options['max-players']
		});
		version = options.version;
		this.clients = [];
		this.offlineToOnline = {};
		this.commands = [];
		this.clientCloseEvent = clientClose;
		this.serverCloseEvent = serverClose;
		this.clientPacketEvent = clientPacket;
		this.serverPacketEvent = serverPacket;
		this.loginServerEvent = loginServer;
		this.beforeLoginEvent = beforeLogin;
		this.sendMessage = sendMessage;
			this.on('login', (client) => {
				this.beforeLoginEvent(client);
				var endedClient = false
				,	endedTargetClient = false
				,	clientIP = client.socket.remoteAddress
				;
				client
					.on('end', () => {
						this.clientCloseEvent(client);
						endedClient = true;
						console.log(lastClientMeta);
						console.log(lastServerMeta)
						console.log(`Connection closed by client (${clientIP})`);
						if (!endedTargetClient) targetClient.end('End');
					})
					.on('error', (e) => {
						console.log(`Connection error by client (${clientIP})`);
						console.log(e);
					})
					.on('packet', (data, meta) => {
						lastClientMeta = meta.name;
						var send = this.clientPacketEvent(client, data, meta, targetClient);
						if(meta.name==='chat'){
							var args = data.message.split(' ');
							var cmds = this.commands;
							cmds.forEach(function(cmd){
								cmd['alias'].forEach(function(a){
									try{
										if(a == args[0]){
											send=false;
											if(!cmd.toggleable){
												var c = cmd.cmd(client, args, sendMessage, targetClient, cmds);
												if(c != undefined){ //If a command is a shortcut, eg .gm 1 would say /gamemode 1, the command would return '/gamemode 1', and this sends it.
													targetClient.write('chat', {message:c});
												}
											}else{
												cmd.enabled = !cmd.enabled;
												sendMessage(client, '&4[Mafia] &8You have '+((cmd.enabled == true) ? '&2enabled &8' : '&4disabled &8')+cmd.name)
												if(cmd.enabled){
													cmd.onEnable(client, args, sendMessage, targetClient);
												}else{
													cmd.onDisable(client, args, sendMessage, targetClient);
												}
											}
										}
									}catch(e){
										sendMessage(client, '&4There was an error with this command');
										console.log('Command error: '+e.stack);
									}
									})
								})
							}
						if (targetClient.state === mc.states.PLAY &&
							meta.state === mc.states.PLAY &&
							!endedTargetClient) {
							if((typeof send == 'boolean' && send) || typeof send == 'object'){
								if(typeof send === 'boolean'){
							        targetClient.write(meta.name, data);
								}else{
									targetClient.write(meta.name, send);
								}
							}
						}
					});
				var targetClient = mc.createClient({
					username: (options.username != undefined) ? options.username : client.username,
					password: (options.password != undefined) ? options.password : undefined,
					host: options.serverHost,
					port: options.serverPort,
					keepAlive: options.keepAlive,
					version: options.version,
					clientVersion : 'v1.0',
					nofallY : 0,
					X: 0,
					Y: 0,
					Z: 0,
					YAW : 0,
					PITCH : 0
				});

				targetClient
					.on('login', (meta, data) => {
						var send = this.loginServerEvent(client, data, meta);
						if(typeof send == 'object'){
							data = send;
						}
					})
					.on('packet', (data, meta) => {
						lastServerMeta = meta.name;
						var send = this.serverPacketEvent(targetClient, data, meta, client);
						if(typeof send == 'object'){
							data = send;
						}
						if(send == undefined){
							send = true;
						}
						if(meta.name==='disconnect'){
							client.end(data['reason'].replace(/"/g, ''));
						}
						if ((meta.state == mc.states.PLAY || client.state == mc.states.LOGIN) &&
							(client.state == mc.states.PLAY || client.state == mc.states.LOGIN) &&
							!endedClient) {
							if(send){
							    client.write(meta.name, data);
							}
						}
					})
					.on('end', () => {
						this.serverCloseEvent(client);
						endedTargetClient = true;
						console.log(`${client.username} left the client (${clientIP})`);
						if (!endedClient){
							client.end('End')
						    this.clients.splice(this.clients.indexOf(client), 1);
						}
					})
					.on('error', (err) => {
						endedTargetClient = true;
						console.log(`Connection closed by server [error?] (${clientIP})`);
						console.log(err.stack);
						console.log(err)
						console.log(lastClientMeta);
						console.log(lastServerMeta);
						if (!endedClient){
							client.end('Error');
							this.clients.splice(this.clients.indexOf(client), 1);
						}
					});
			});
	}
}
function clientClose(client){
	console.log('Hook run for client close')
}
function serverClose(client){
	console.log('Hook run for server close')
}
function clientPacket(sender, data, meta){
	var send=true;
	return send;
}

module.exports = Proxy;

function serverPacket(reciever, data, meta){
	//console.log('Server packet hook! '+meta.name);
	return true;
}

function loginServer(client, data, meta){
	console.log(client.username+' logged in. ('+client.socket.remoteAddress+')')
}
function sendMessage(client, msg){
	if(client == undefined){
		return;
	}
	msg=msg.replace(/&/g, '§');
	msg=JSON.stringify(msg);
	if(baseVersion() == '1.9'){
		client.write('chat', {message : '{"text" : '+msg+'}'})
	}else{
		client.write('chat', {message : msg})
	}
}

function beforeLogin (client){
	return;
}

function getClient (clients, username){
	var send;
	clients.forEach((a) => {
		if(a.username == username){
			send = a
			return a
		}
	})
	return send
}

function baseVersion () {
	var base = version.substr(0, 3);
	if (base == '16w' || base == '15w') {
		base='1.9'
	}
	return base
}
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.stack}`)
	console.log(lastClientMeta)
	console.log(lastServerMeta)
});
