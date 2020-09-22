const db = require("../data/db-config.js");

module.exports = {
	// registration & login
	addUser,
	getUserByLogin,

	// testing users db
	getAllUsers,
	getUserByID,

	// posts related
	getAllPosts,
	getPostByID,
	getPostsByUserID,
	addPost,
	updatePost,
	deletePost,
};

// ------------------------------------------------------------------------------
// ALL GET REQUESTS
// ------------------------------------------------------------------------------

function getUserByLogin(username) {
	return db("users").where(username);
} // WORKING
function getAllUsers() {
	return db("users");
} // WORKING
function getUserByID(id) {
	return db("users").where({ id });
} // WORKING
function getAllPosts() {
	return db("posts");
} // WORKING
function getPostByID(id) {
	return db("posts").where({ id });
} // WORKING
function getPostsByUserID(postID) {
	return db("posts").where({ user_id: postID });
}

// ------------------------------------------------------------------------------
// ALL POST REQUESTS
// ------------------------------------------------------------------------------

async function addUser(user) {
	try {
		const [id] = await db("users").insert(user, "id");
		return user;
	} catch (error) {
		throw error;
	}
} // WORKING
function addPost(post) {
	return db("posts")
		.insert(post)
		.returning("id")
		.then((ids) => {
			const id = ids[0];

			return getPostByID(id);
		});
} // WORKING

// ------------------------------------------------------------------------------
// ALL PUT REQUESTS
// ------------------------------------------------------------------------------

function updatePost(id, changes) {
	return db("posts")
		.where({ id })
		.update(changes)
		.then(() => {
			return getPostByID(id);
		});
} // WORKING

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

function deletePost(id) {
	return db("posts").where({ id }).del();
} // WORKING
