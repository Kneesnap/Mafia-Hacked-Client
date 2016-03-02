/*
	when i dun goofd or ya feeling like makin a quick packet on the go
*/
var Module = require('../module.js');
var hooks = {};
var hack = new Module({
		name: '.js',
		alias: ['.js'],
		help: "Run some javascript",
		cmd: (sender, args, sendMessage, targetClient) => {
			if(args.length == 1){
				sendMessage(sender, '&cUsage: .js <command>');
			}else{
				args[0] = '';
				var full = args.join(' ');
				full = full.substr(1);
				var show = eval(full);
				if(typeof show == 'object'){
					sendMessage(sender, Object.keys(show).toString())
				}else{
					if(show != undefined){
						sendMessage(sender, show.toString());
					}
				}
			}
		},
})

module.exports = hack;