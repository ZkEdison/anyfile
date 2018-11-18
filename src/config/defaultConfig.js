module.exports = {
	root: process.cwd(),
	hostname: 'localhost',
	port: 3000,
	compress: /\.(html|js|css|md)/,
	cache: {
		maxAge: 600,
		expires: true,
		cacheControl: true,
		lastModified: true,
		etag: true
	}
}
