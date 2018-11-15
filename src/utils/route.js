const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const mime = require('./mime')
const Handlebars = require('handlebars')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const tplPath = path.join(__dirname, './../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

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
			// file 是一个buffer
			let fileStream = fs.createReadStream(filePath)
			fileStream.pipe(res)

		} else if (stats.isDirectory()) {
			let mimeType = mime.getMimeType(filePath)
			let files =  await readdir(filePath)
			let dir = path.relative(config.root, filePath)
			let data = {
				title: path.basename(filePath),
				files: files.map(file => {
					return {
						filePath: path.join('/', dir, file),
						file: file,
						iconPath: mime.getIconUrl(mimeType)
					}
				})
			}
			console.info(data)
			res.end(template(data))
		} else {

			throw new Error('异常')
		}

	} catch (error) {
		res.end('404')
		console.info(error)
	}
}
