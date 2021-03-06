const yargs = require('yargs')
const Service = require('./app.js')


const argv = yargs
	.usage('anyfile [options]')
	.option('p', {
		alias: 'port',
		describe: '端口号',
		default: 3100
	})
	.option('h', {
		alias: 'hostname',
		describe: 'host',
		default: '127.0.0.1'
	})
	.option('d', {
		alias: 'root',
		describe: 'root path',
		default: process.cwd()
	})
	.version()
	.alias('v', 'version')
	.help()
	.argv

const service = new Service(argv)
service.start()
