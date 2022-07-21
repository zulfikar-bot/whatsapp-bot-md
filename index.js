const client = require('./lib/client')
const { DATABASE, VERSION } = require('./config')
const start = async () => {
	try {
		console.log(`Zulfikar-Bot ${VERSION}`)
		await DATABASE.sync()
		console.log('DB syncing')
		await client.connect()
	} catch (error) {
		console.error(error)
	}
}
start()
