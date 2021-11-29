const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

const port = 8080;
const server = app.listen(port, () => console.log(`server is running on port ${port}`))
const socket = require('socket.io');

const io = socket(server, {
  cors:{
    origins: ["*"],

    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true,
      });
      res.end();
    }
  }
});




io.on('connection', onConnection);

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

// server.listen(port, () => console.log(`server is running on port ${port}`));