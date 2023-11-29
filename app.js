const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: "*" }
  });

  app.use('/', express.static('public'))

  io.on('connection', (socket) => {
      console.log('a user connected');

          socket.on('message', (message) =>     {
                  console.log(message);
                          io.emit('message', message);   
                              });
                              });

                              server.listen(process.env.PORT || 8080, () => console.log('listening on http://localhost:8080') );
                              