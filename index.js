const express = require("express")
const morgan = require('morgan')
const { deny} = require("./middleware");
const welcomeRouter = require("./welcome/welcome-router")
const usersRouter = require("./users/users-router")

const server = express()
const port = 4000
 //parses json data takes incoming json data and parses it into req.body
server.use(express.json());

//give the client a 50 50 chnace of recieving an error
//server.use(deny());

//third-party middleware that will log a line to the console witht the request details
//server.use(morgan("combined"))
//custom logger middleware here
server.use((req, res, next) => {
	const time = new Date().toISOString();
	console.log(` [${time}] ${req.ip} ${req.method} ${req.url} `);
	//this middlewear function is done and we move on to the next piece of middleware in the queue/stack
	next();
})

server.use(welcomeRouter)
server.use(usersRouter)


//define some error haldler middleware
//4 params instead of 3 so express just knows this is an error middleware
server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: "something went wrong please try again later"
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
