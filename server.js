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

// GET all users
server.get("/users", (req, res) => {
    const users = db.getUsers()
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved.",
        })
    }
})

// GET specific user
server.get("/users/:id", (req, res) => {
    // param id variable matches URL param :id
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    } else if (!user) {
        res.status(404).json({
            message: `The user with the specified ID ${req.params.id} does not exist.`,
        })
    } else {
        res.status(500).json({
            ErrorMessage: "The user information could not be retrieved."
        })
    }
})

// watch for connections on the specified port, below
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})