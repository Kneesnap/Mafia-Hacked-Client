/*
	FakeChat. Useful for framing people.
*/
var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: 'FakeChat',
		alias: ['.fc','.fakechat'],
		help: "Create a fake message",
		cmd: (sender, args, sendMessage) => {
			if(args.length == 1){
				sendMessage(sender, '&cUsage: .'+args[0]+' <message>');
			}else{
				args[0]='';
				var message = args.join(' ').substr(1);
			    sendMessage(sender, message);
			}
		},
})

module.exports = hack;