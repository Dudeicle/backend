const express = require("express");

const router = express.Router();

// importing files
const ExpatJournal = require("../expat/expat-model.js");

// --- URL UP TO THIS POINT
// --- /api/expat/auth/protected

// ------------------------------------------------------------------------------
// ALL GET REQUESTS
// ------------------------------------------------------------------------------

//// GET ALL USERS AND GET USER BY ID --FOR TESTING--
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

//// GET REQUESTS FOR POSTS
router.get("/posts", (req, res) => {
	ExpatJournal.getAllPosts()
		.then((posts) => {
			res.status(201).json({ data: posts });
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
}); // WORKING
router.get("/post/:id", (req, res) => {
	const id = req.params.id;

	ExpatJournal.getPostByID(id)
		.then((post) => {
			res.status(201).json({ data: post });
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
}); // WORKING
router.get("/user/:id/posts", (req, res) => {
	const id = req.params.id;

	ExpatJournal.getPostsByUserID(id)
		.then((posts) => {
			if (posts.length === 0) {
				res.status(404).json({ message: "This user does not have any posts!" });
			} else {
				res.status(201).json(posts);
			}
		})
		.catch((error) => {
			res.status(404).json({ message: "Could not find the User of specified ID" });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL POST REQUESTS
// ------------------------------------------------------------------------------

router.post("/posts", (req, res) => {
	let newPost = req.body;

	ExpatJournal.addPost(newPost)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL PUT REQUESTS
// ------------------------------------------------------------------------------

router.put("/post/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	ExpatJournal.getPostByID(id)
		.then((post) => {
			if (post) {
				ExpatJournal.updatePost(id, changes).then((updatedPost) => {
					res.json(updatedPost);
				});
			} else {
				res.status(404).json({ message: "Could not find the post of that ID" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

router.delete("/post/:id", (req, res) => {
	const { id } = req.params;

	ExpatJournal.deletePost(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: "Could not find post with given ID" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to delete question" });
		});
}); // WORKING

module.exports = router;
