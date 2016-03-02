/* 
    Derp. don't just be retarded, look retarded
*/
var Module = require('../module.js');
var run = false;
var hack = new Module({
		name: 'Derp',
		alias: ['.derp', '.retard'],
		help: "Look retarded",
		onEnable: (sender, data, sendMessage, targetClient) => {doDerp(targetClient);},
		onDisable: () => {},
		toggleable : true,
		clientHook : {
			'look' : (sender, data, sendMessage, targetClient) => {
				if(hack['enabled']){
					return false;
				}
				return true;
			},
			'position_look' : (sender, data, sendMessage, targetClient) => {
				if(hack['enabled']){
					targetClient.write('position', {x : data['x'], y : data['y'], z : data['z'], onGround : data['onGround']});
					return false;
				}
				return true;
			}
		}
})
function doDerp(targetClient){
	if(!run){
		setInterval(function(){
		if(hack['enabled']){
			var randNum = rand(1, 2);//make this random
			if(randNum == 1){
				targetClient.write('animation', {});
			}else{
				targetClient.write('look', {yaw : rand(0, 90), pitch : rand(0, 90), onGround : true})
			}
		}
		}, 250);
		run = true;
	}
}
function rand(min, max){
	return parseInt((Math.random() * (max - min)) + min);
}
module.exports = hack;