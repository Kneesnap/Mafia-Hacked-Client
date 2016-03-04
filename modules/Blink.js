// Blink. Unlike the actual blink, this isn't similar to winking

var Module = require('../module.js')
var packets = []
var hack = new Module({
		name: 'Blink',
		alias: ['.blink'],
		help: "Teleport",
		onEnable: (sender, data, sendMessage) => {
			packets = []
			sendMessage(sender, '&cMove, then disable blink')
		},
		onDisable: (sender, data, sendMessage, targetClient) => {
			packets.forEach((a) => {
				var meta = a.meta
				a.meta = undefined
				targetClient.write(meta.name, a)
			})
			packets = []
		},
		toggleable : true,
		clientHook: {
			'all': function(sender, data, meta) {
				return logPacket(meta, data)
			}
		}
})
function logPacket(meta, data){
	if(hack.enabled){
		data['meta'] = meta
		if(meta.name != 'chat'){
			packets.push(data)
			return false
		}else{
			return (data['message'].indexOf('.') != 0)
		}
	}else{
		return true
	}
}
module.exports = hack
