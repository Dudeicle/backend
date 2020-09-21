const express = require("express");

const router = express.Router();

// importing files
const ExpatJournal = require("../expat/expat-model.js");

// ------------------------------------------------------------------------------
// ALL GET REQUESTS
// ------------------------------------------------------------------------------

// GET ALL USERS AND GET USER BY ID
router.get("/users", (req, res) => {
	ExpatJournal.getAllUsers()
		.then((users) => {
			res.status(201).json({ data: users });
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
}); // WORKING
router.get("/user/:id", (req, res) => {
	const { id } = req.params;

	ExpatJournal.getUserByID(id)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL POST REQUESTS
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// ALL PUT REQUESTS
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

module.exports = router;
