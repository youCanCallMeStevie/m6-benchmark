const express = require('express');

require("dotenv").config();
const routes = require('./src/services/routes');
const listEndpoints = require('express-list-endpoints');
const cors = require('cors');
const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./src/helpers/errorHandlers");


//INITIAL SETUP
const server = express();
require("dotenv").config();
const port = process.env.PORT // 3004

//MIDDLEWARES
server.use(cors());
server.use(express.json());

//ROUTE
server.use("/api", routes)


//ERROR HANDLERS
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
console.log(listEndpoints(server))


server.listen(port, () => {
	if (server.get("env") === "production")
		console.log("Server is running on CLOUD on PORT:", port);
	console.log("Server is running LOCALLY on PORT:", port);
});
