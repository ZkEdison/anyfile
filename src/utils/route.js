const fs = require('fs')
// const path = require('path')
const promisify = require('util').promisify
const mime = require('./mime')

const stat = promisify(fs.stat)

/**
 * @param filePath 是相对系统的绝对路径
 */
module.exports =  async function (req, res, filePath, config) {
	try {
		const stats = await stat(filePath)

		if (stats.isFile()) {
			// 是文件
			console.info(mime, config)
			// const contentType = mime(filePath)
		} else if (stats.isDirectory()) {
			// 是文件夹
		} else {
			// 都不是
			throw new Error('')
		}

	} catch (error) {
		console.info(error)
	}
}
