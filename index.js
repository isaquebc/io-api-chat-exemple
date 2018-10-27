import express from 'express';
import bodyParser from 'body-parser';
import socketIo from "socket.io"
import http from 'http'

const app = express();

app.set('port', 3000);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

process.on('unhandledRejection', (reason, p) => {
	console.log(reason);
	console.log(p);
});

const server = http.createServer(app);
const io = socketIo({ 
	serveClient: false,
	transports: [ 'websocket', 'polling' ],
	pingTimeout: 3000,
	pingInterval: 3000,
	allowUpgrades: false,
	upgrade: false,
	cookie: false
}).listen(server);


io.on('connection', function(socket){
  io.emit('chat', { mano: 'do ceu'})
});

app.get('/change_name', (req, res) => {
	const { name, message, destinate } = req.query;
	res.sendStatus(200);
	
	io.emit('destinate', {name, message});
});



server.listen(3000, err => {
	if(err) console.log(err);
	else {
		console.log(`----`);
		console.log(`Server online - Listening to port ${3000}`);
		console.log(`----`);
	}
});