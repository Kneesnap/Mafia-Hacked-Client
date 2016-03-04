/*
    headroll. get banned quickly
*/
var Module = require('../module.js')
var headPitch = 0
var rotation = 0
var run = false
var hack = new Module({
		name: 'HeadRoll',
		alias: ['.headroll'],
		help: "Roll your head through your body",
		onEnable: (sender, data, sendMessage, targetClient) => { rollPacket(targetClient) },
		onDisable: () => {},
		toggleable : true,
		clientHook : {
			'look' : (sender, data, sendMessage, targetClient) => {
				return !hack.enabled
			},
			'position_look' : (sender, data, sendMessage, targetClient) => {
				if (hack.enabled) {
					data.pitch = headPitch
				}
				rotation = data.yaw
				return data
			}
		}
})
function rollPacket(targetClient){
	if(!run){
		run=true;
		setInterval(function(){
			headPitch--
			if (headPitch <= -180) {
				headPitch = 180
			}
			targetClient.write('look', {yaw : rotation, onGround : true, pitch : headPitch});
		}, 50);
	}
}

module.exports = hack;
