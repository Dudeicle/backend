const express = require("express");
const cors = require("cors");

const protectedRoute = require("../auth/restricted-mw.js");
const ExpatRouter = require("../expat/expat-router.js");
const AuthRouter = require("../auth/auth-router.js");
const TokenRouter = require("../auth/token-router.js");

const server = express();

server.use(cors());
server.use(express.json());

// This contains only unprotected GET requests for posts
server.use("/api/expat", ExpatRouter);

// This contains the POST for registration and login + authorization
server.use("/api/expat/auth", AuthRouter);

// This contains the GET/POST/DELETE requests that are locked behind authorization and will require the token from login
server.use("/api/expat/auth/protected", protectedRoute, TokenRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;
