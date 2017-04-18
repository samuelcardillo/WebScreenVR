// Quick web server written in order to comply 
// with the Chrome extension HTTPS requirements

var express = require("express")
	, app 		= express()
	, path 		= require("path")
	, fs 			= require('fs')
	, http 		= require("http").createServer(app).listen(80)
	, https 	= require("https").createServer({
		key: 	fs.readFileSync('server.key'),
		cert: fs.readFileSync('server.crt')
	}, app).listen(443);

app.use('/', express.static(path.join(__dirname, 'code')));

console.log("Local web server launched on HTTP & HTTPS.");