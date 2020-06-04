const express = require("express"); // import express
const server = express();           // declare express server
server.use(express.json());         // middleware to parse JSON

const hostname = '127.0.0.1';       // local server name
const port = 3000;                  //  listening port

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
    res.send('Hello from Express');
  });

// watch for connections on the specified port, below
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})