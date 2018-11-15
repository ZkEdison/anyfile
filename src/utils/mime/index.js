
const path = require('path')

const Registries = require('./registries.json')
const MimeTypes = require('./mime_types.json')
const config = require('./config.json')
const getMimeType = require('./mime.js')
const defaultIcon = config.defaultIcon

function generatePath(icon) {
	return `${config.iconsPath}${icon}${config.iconsExtension}`
}

function getMimeRegistry(mimeType) {
	return mimeType.split('/')[0]
}

function getIconUrl(mimeType) {
	mimeType = mimeType.trim()
	let file = MimeTypes[mimeType]
	if (!file) {
		const registry=getMimeRegistry(mimeType)
		file=Registries[registry]
		if(!file) file=defaultIcon
	}
	return path.resolve(__dirname, generatePath(file))
}



// console.info(getIconUrl(getMimeType('././a.css')))
// console.log(getIconUrl('text/html'))

module.exports = {
	getMimeType,
	getIconUrl
}
