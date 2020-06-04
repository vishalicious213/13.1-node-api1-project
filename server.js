const express = require("express"); // import express
const server = express();           // declare express server
server.use(express.json());         // middleware to parse JSON
const db = require("./db.js")
const hostname = '127.0.0.1';       // local server name
const port = 3000;                  //  listening port

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
    res.send('Hello from Express');
  });

  server.get("/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
    // res.json({ message: "Hello, World!"})
})

// watch for connections on the specified port, below
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})