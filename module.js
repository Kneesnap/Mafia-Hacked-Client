// module.js

'use strict'

function isFunction (fn) {
	return typeof fn === 'function' ? fn : () => {}
}

function isObject (obj) {
	return typeof obj === 'object' ? obj : {}
}

class Module {
	constructor (options) {
		options = options || {}
		this.options = options
		this.enabled = typeof options.enabled === 'boolean' && options.enabled
		this.autocomplete = typeof options.autocomplete === 'string' ? options.autocomplete : '/yoidontexist'
		this.name = options.name || 'Unknown'
		this.alias = typeof options.alias === 'object' && options.alias instanceof Array ? options.alias : [this.name.toLocaleLowerCase()]
		this.help = options.help || '&4No info'
		this.cmd = isFunction(options.cmd)
		this.onEnable = isFunction(options.onEnable)
		this.onDisable = isFunction(options.onDisable)
		this.serverHook = isObject(options.serverHook)
		this.clientHook = isObject(options.clientHook)
		this.loginEvent = isObject(options.loginEvent)
		this.toggleable = false
		this.toggleable = typeof options.toggleable === 'boolean' && options.toggleable
	}
}

module.exports = Module
