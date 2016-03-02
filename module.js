'use strict'
class Module {
	constructor(options) {
		options = options || {};
		this.options = options;
		this.enabled = typeof options.enabled === 'boolean' && options.enabled;
		this.autocomplete = ((typeof options.autocomplete === 'string') ? options.autocomplete : '/yoidontexist');
		this.name = options.name || 'Unknown';
		this.alias = typeof options.alias === 'object' && options.alias instanceof Array ? options.alias : [this.name.toLocaleLowerCase()];
		this.help = options.help || '&4No info';
		this.cmd = typeof options.cmd === 'function' ? options.cmd : () => {};
		this.onEnable = typeof options.onEnable === 'function' ? options.onEnable : () => {};
		this.onDisable = typeof options.onDisable === 'function' ? options.onDisable : () => {};
		this.serverHook = typeof options.serverHook === 'object' ? options.serverHook : {};
		this.clientHook = typeof options.clientHook === 'object' ? options.clientHook : {};
		this.loginEvent = typeof options.loginEvent === 'object' ? options.loginEvent : {};
		this.toggleable = false;
		this.toggleable = typeof options.toggleable === 'boolean' && options.toggleable;
	}
}

module.exports = Module;