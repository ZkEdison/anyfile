const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const mime = require('./mime')
const Handlebars = require('handlebars')
const isFresh = require('./cache')
const range = require('./range')
const compress = require('./compress')

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
			const mimeType = mime(filePath)
			res.setHeader('Content-Type', mimeType)

			// 判断缓存是否是新鲜的
			if (isFresh(stats, req, res)) {
				res.statusCode = 304
				res.end()
				return
			}

			let rs
			// 是不是range
			let {code, start, end} = range(stats.size, req, res)
			if (code === 200) {
				res.statusCode = 200
				rs = fs.createReadStream(filePath)
			} else {
				res.statusCode = 206
				rs = fs.fileStream(filePath, {start, end})
			}

			// compress 压缩
			if (filePath.match(config.compress)) {
				rs = compress(rs, req, res)
			}


			rs.pipe(res)

		} else if (stats.isDirectory()) {
			console.info('isDirectory')
			let files =  await readdir(filePath)
			let dir = path.relative(config.root, filePath)
			res.statusCode = 200
			res.setHeader('Content-Type', 'text/html')
			let data = {
				title: path.basename(filePath),
				dir: dir ? `/${dir}` : '',
				files: files.map(file => {
					return {
						file,
						icon: mime(file)
					}
				})
			}
			res.end(template(data))
		} else {

			throw new Error('异常')
		}

	} catch (error) {
		console.error(error)
		res.statusCode = 404
		res.setHeader('Content-Type', 'text-plain')
		res.end(`${filePath} not find`)
	}
}
