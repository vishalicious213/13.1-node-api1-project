const express = require("express")  // import express
const server = express()            // declare express server
server.use(express.json())          // middleware to parse JSON

