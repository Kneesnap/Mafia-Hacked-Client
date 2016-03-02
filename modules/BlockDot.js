/*
	BlockDot. Block chat messages that start with a dot.
*/
var Module = require('../module.js');
var hack = new Module({
		name: 'BlockDot',
		enabled : true,
		alias: ['.blockdot'],
		help: "Blocks messages that start with .",
		onEnable: () => {},
		onDisable: () => {},
		toggleable : true,
		clientHook : {
			'chat' : (sender, data, sendMessage) => {
				if(hack['enabled'] && data.message.indexOf('.') == 0){
					return false;
				}else{
					return true;
				}
			}
		}
})

module.exports = hack;