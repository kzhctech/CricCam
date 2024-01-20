const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const ip = require('ip');
const localIP = ip.address();


const app = express();

// Your other Express setup...
app.use('/', express.static('public'));

const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error('Key or certificate file not found. Please check file paths.');
  process.exit(1);
}

const serverOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const server = https.createServer(serverOptions, app);
const io = socketIO(server, {
  cors: { origin: "*" },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });
});

/*
server.listen(process.env.PORT || 8080, '192.168.79.242' , () => {
  console.log('Listening on https://192.168.79.242:8080');
});
*/

server.listen(process.env.PORT || 8080, localIP, () => {
  console.log(`Listening on https://${localIP}:8080`);
});