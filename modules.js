/*
	Loads all the modules
*/
exports.loadHacks = require('fs').readdirSync('./modules/').map(file => { return require('./modules/' + file) })