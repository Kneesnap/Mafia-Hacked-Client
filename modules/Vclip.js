/*
	VClip. just like for nofall, it helps when doing another 9/11, except this gets you out of the plane.
*/
var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: 'VClip',
		alias: ['.up','.vclip','.down'], 
		help: "Teleport vertically",  
		cmd: (sender, args, sendMessage, targetClient) => {
			if(args.length == 1){
				sendMessage(sender, '&cUsage: '+args[0]+' <blocks>')
			}else{
				sendMessage(sender, '&4[Mafia]&8 Teleported '+((parseInt(args[1]) > 0) ? 'up' : 'down')+' '+parseInt(args[1])+' blocks')
				targetClient.write('position', { x : sender.X , y : sender.Y + parseInt(args[1]) , z : sender.Z, onGround : true})
				sender.write('position', { x : sender.X , y : sender.Y + parseInt(args[1]) , z : sender.Z, yaw : sender.YAW, pitch : sender.PITCH, flags : 0})
			}
		}
})

module.exports = hack;