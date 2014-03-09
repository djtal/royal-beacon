http = require('http');
url = require('url');
moment = require('moment');
redis = require('redis');

client = redis.createClient();

http.createServer(function(req, res){
	var requestURL = url.parse(req.url, true)['pathname'];

	if (requestURL == '/log.gif') {
		var imgHex = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';
		var imgBinary = new Buffer(imgHex, 'hex');
		res.writeHead(200, {'Content-Type': 'image/gif' });
		res.end(imgBinary, 'binary');

		// Do MySQL/Redis/MongoDB logging

    var params = url.parse(req.url, true);
    params.query.time = moment().format();
    var event = params.query
    var query = params.query
    key = []
    key.push(query.code);
    key.push(query.controller.replace("/", ":"));
    key.push(query.action);
    if (query.hasOwnProperty("id")) {
      key.push(query.id);
    }
    client.incr(key.join(":"));
    var app_key = []
    app_key.push(query.code);
    app_key.push("stats");
    client.sadd(app_key.join(":"), key.join(":"))
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end('');
	}
}).listen(8080); // Ofcourse u can use whatever IP/port combination you want
