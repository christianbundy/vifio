/**
 * Module dependencies.
 */

 var sys = require('sys')
 var exec = require('child_process').exec;
 function puts(error, stdout, stderr) { sys.puts(stdout) }

 var express = require('express');

 var app = module.exports = express();

// Ad-hoc example resource method
var server_uri = 'http://localhost:3000';

app.resource = function(path, obj) {
	this.get(path + ':a', obj.convert);
	this.get(path + ':a/:b.mp4', obj.upload);
	this.get(path + ':a/:b', obj.download);
};

var video = {
	download: function(req, res){
		command="curl -o dl/" + req.params.a + ".gif " + decodeURIComponent(req.params.b);
		exec(command, puts);
		exec('echo dl', puts);
		res.send(server_uri + '/' + req.params.a);
	},
	convert: function(req, res){
		command='gif2mp4 dl/' + req.params.a + '.gif ul/' + req.params.a + '.mp4';
		console.log(command)
		exec(command, puts);
		res.send(server_uri + '/v/' + req.params.a + '.mp4');
	},
	upload: function(req, res){
		var filename = 'dl/' + req.params.a;
		exec('echo dasdfl', puts);
		res.attachment(filename);
		res.send('wow'); //Actually, the data will be loaded form db.
	}

};

app.resource('/', video);

if (!module.parent) {
	app.listen(3000);
	console.log('Express started on port 3000');
}