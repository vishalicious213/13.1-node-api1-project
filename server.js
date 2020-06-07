const express = require("express"); // import express
const server = express();           // declare express server
server.use(express.json());         // middleware to parse JSON
server.use(cors());                 // middleware to enable CORS
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

// GET to /users/:id to retrieve specific user
server.get("/users/:id", (req, res) => {
    // param id variable matches URL param :id
    const user = db.getUserById(req.params.id)

    if (user) {
        res.json(user)
    } else if (!user) {
        res.status(404).json({
            ErrorMessage: `The user with the specified ID ${req.params.id} does not exist.`,
        })
    } else {
        res.status(500).json({
            ErrorMessage: "The user information could not be retrieved."
        })
    }
})

// POST to /users to make a new user
server.post("/users", (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			ErrorMessage: "Please provide a name for the user.",
		})
    }
    
    if (!req.body.bio) {
		return res.status(400).json({
			ErrorMessage: "Please provide a bio for the user.",
		})
	}

	const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
	})

    if (newUser) {
        res.status(201).json(newUser)
    } else {
        res.status(500).json({
            ErrorMessage: "There was an error while saving the user to the database."
        })
    }
})

// PUT to /users/:id to update specific user
server.put("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

    if (!user) {
        return res.status(404).json({
            ErrorMessage: `The user with the specified ID ${req.params.id} does not exist.`,
        })
    }

    if (!req.body.name) {
		return res.status(400).json({
			ErrorMessage: "Please provide a name for the user.",
		})
    }
    
    if (!req.body.bio) {
		return res.status(400).json({
			ErrorMessage: "Please provide a bio for the user.",
		})
	}

	if (user) {
		const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
		})
		res.status(200).json(updatedUser)
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified.",
        })
    }
})

// DELETE to /users/:id to delete specific user
server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    
    if (!user) {
        return res.status(404).json({
            ErrorMessage: `The user with the specified ID ${req.params.id} does not exist.`,
        })
    }

	if (user) {
		db.deleteUser(user.id)
		// 204 is a successful empty response, since there's nothing to return
		res.status(204).end()
	} else {
		res.status(500).json({
			errorMessage: "The user could not be removed.",
		})
	}
})

// watch for connections on the specified port, below
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})