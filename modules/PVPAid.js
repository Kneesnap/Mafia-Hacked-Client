/*
	PVPAid. because it's not even an aura yet. I'm too lazy to make this :/ I'll never use it anyways.
	This probably won't become functional until mineflayer is updated to 1.9
	Honestly, I could make an aura that functions, but...... nahhhhh I'd never use it
*/
var Module = require('../module.js');
var entities = [];
var targetEntity = 0;
var pos = {};
var tC;
var hack = new Module({
		name: 'PVPAid',
		alias: ['.pvp', '.killaura', '.aura'],
		help: "Not a good pvp thing",
		onEnable: (sender, data ,sendMessage) => {
			sendMessage(sender, '&4[Mafia] &8Remember, this is a &6WIP &8feature.');
		},
		onDisable: () => {
			targetEntity = 0;
			entities = [];
		},
		toggleable : true,
		serverHook: {
			'entity_destroy': function(sender, data, sendMessage) {
				data['entityIds'].forEach(function(a){
					if(a==targetEntity){
						targetEntity = 0;
					}
					if(entities.indexOf(a) != -1){
						entities.splice(entities.indexOf(a), 1);
					}
					return true;
				})
			},
			'entity_teleport' : (sender, data, sendMessage, targetClient) => {
				pos[data['entityId']] = {x : data['x'] / 32, y : data['y'] / 32, z : data['z'] / 32, onGround : true, yaw : 0, pitch : 90, flags : 0};
				if(hack['enabled'] && data['entityId'] == targetEntity && targetEntity != 0){
					pos[data['entityId']]['x'] = data['x'] / 32;
					pos[data['entityId']]['y'] = data['y'] / 32;
					pos[data['entityId']]['z'] = data['z'] / 32;
					tp(pos[data['entityId']], sender, targetClient)
				}
				return true;
			},
			'entity_move_look' : (sender, data, sendMessage, targetClient) => {
				var dX = data['dX'];
				var dY = data['dY'];
				var dZ = data['dZ'];
				if(pos[data['entityId']] != undefined){
				pos[data['entityId']]['x']+=(dX / 32);
				pos[data['entityId']]['y']+=(dY / 32);
				pos[data['entityId']]['z']+=(dZ / 32);
				if(data['entityId'] == targetEntity){
					tp(pos[data['entityId']], sender, targetClient);
				}
		    	}
				return true;
			},
			'rel_entity_move' : (sender, data, sendMessage, targetClient) => {
				if(pos[data['entityId']] != undefined){
				pos[data['entityId']]['x']+=data['dX'] / 32;
				pos[data['entityId']]['y']+=data['dY'] / 32;
				pos[data['entityId']]['z']+=data['dZ'] / 32;
				if(data['entityId']==targetEntity){
					tp(pos[data['entityId']], sender, targetClient);
				}
				}
				return true;
			}
		},
		clientHook: {
			'use_entity': (sender, data, sendMessage, targetClient) => {
				tC = targetClient;
				if(hack['enabled']){
				targetEntity = data['target'];
				if(entities.indexOf(data['target']) == -1){
					entities.push(data['target']);
				}
				}
				return true;
			}
		}
})
setInterval(function(){
	if(hack.enabled && targetEntity != 0){
    //	entities.forEach(function(a){
		    attackEntity(targetEntity, tC);
	  //  })
	}
}, 250);
function tp(data, targetClient, sender){
	if(hack.enabled){
	targetClient.write('position', {x:data['x'], y:data['y'], z:data['z'], onGround : true});
	sender.write('position', data);
	console.log(data);
	}
	
}
function attackEntity(entityId, targetClient){
	if(hack.enabled){
	targetClient.write('use_entity', {target : entityId, mouse : 1})
	}
}
module.exports = hack;