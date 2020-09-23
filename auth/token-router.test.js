const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/db-config.js");

// -IF- === Intentional Failure

describe("token required routes to posts database", () => {
	//truncate
	beforeEach(async () => {
		await db("users").truncate();
	});
	beforeEach(async () => {
		await db("posts").truncate();
	});

	// --- POST TEST                  --- //
	it("should post a post to the posts database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		await request(server)
			.post("/api/expat/auth/protected/posts")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "seedPost",
				title: "seedTitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 8 - check is the above post is in the post database
		let postTest = await db("posts");
		expect(postTest).toHaveLength(1);
		//-IF- expect(postTest).toHaveLength(2);
	});

	// --- PUT TEST                   --- //
	it("should update a post within the posts database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		await request(server)
			.post("/api/expat/auth/protected/posts")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "seedPost",
				title: "seedTitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 8 - check is the above post is in the post database
		let postTest = await db("posts");
		expect(postTest).toHaveLength(1);
		//-IF- expect(postTest).toHaveLength(2);

		//STEP 9 - make changes to the post in the database
		await request(server)
			.put("/api/expat/auth/protected/post/1")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "testUPDATEname",
				title: "testUPDATEtitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 10 - check the database to see that the changes have been made
		let putTest = await db("posts");
		expect(putTest[0].title).toBe("testUPDATEtitle");
		//-IF- expect(putTest[0].title).toBe("seedTitle");
	});

	// --- DELETE TEST                --- //
	it("should delete a post within the posts database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		await request(server)
			.post("/api/expat/auth/protected/posts")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "seedPost",
				title: "seedTitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 8 - check is the above post is in the post database
		let postTest = await db("posts");
		expect(postTest).toHaveLength(1);
		//-IF- expect(postTest).toHaveLength(2);

		//STEP 9 - delete the post that was previously made
		await request(server).delete("/api/expat/auth/protected/post/1").set({ Authorization: token });

		//STEP 10 - check that the post was removed from the post database
		let deleteTest = await db("posts");
		expect(deleteTest).toHaveLength(0);
		//-IF- expect(deleteTest).toHaveLength(2);
	});

	// --- GET TEST (/users)          --- //
	it("should GET a user from the users database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		//console.log(token);

		//STEP 7 - use token to post a post
		let userRes = await request(server)
			.get("/api/expat/auth/protected/users")
			.set({ Authorization: token });

		//STEP 8 - check that a user was returned
		//console.log(userRes.body);
		expect(userRes.body.data[0].username).toBe("loginTestUser");
		expect(userRes.body.data[0].id).toBe(1);
		//-IF- expect(userRes.body.data[0].id).toBe(3);
	});

	// --- GET TEST (/user/:id)       --- //
	it("should GET a user from the users database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		let userRes = await request(server)
			.get("/api/expat/auth/protected/user/1")
			.set({ Authorization: token });

		//STEP 8 - check that the user was returned
		//console.log(userRes.body);
		//console.log(userRes.body[0]);
		expect(userRes.body).toHaveLength(1);
		expect(userRes.body[0].username).toBe("loginTestUser");
	});

	// --- GET TEST (/posts)          --- //
	it("should GET a user from the users database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		await request(server)
			.post("/api/expat/auth/protected/posts")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "seedPost",
				title: "seedTitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 8 - check is the above post is in the post database
		let postTest2 = await db("posts");
		expect(postTest2).toHaveLength(1);
		//-IF- expect(postTest2).toHaveLength(2);

		//STEP 9 - use token to post a post
		let postsRes = await request(server)
			.get("/api/expat/auth/protected/posts")
			.set({ Authorization: token });

		//STEP 10 - check that a list of posts was returned
		//console.log(postsRes.body);
		//console.log(postsRes.body.data);
		//console.log(postsRes.body.data[0].name);
		expect(postsRes.body.data).toHaveLength(1);
		expect(postsRes.body.data[0].name).toBe("seedPost");
	});

	// --- GET TEST (/post/:id)       --- //
	it("should GET a user from the users database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		await request(server)
			.post("/api/expat/auth/protected/posts")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "seedPost",
				title: "seedTitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 8 - check that the above post is in the post database
		let postTest3 = await db("posts");
		expect(postTest3).toHaveLength(1);
		//-IF- expect(postTest3).toHaveLength(2);

		//STEP 9 - use token to post a post
		let postsResByID = await request(server)
			.get("/api/expat/auth/protected/post/1")
			.set({ Authorization: token });

		//STEP 10 - check that a single post was returned by ID
		//console.log(postsResByID.body);
		//console.log(postsResByID.body.data);
		//console.log(postsResByID.body.data[0].name);
		expect(postsResByID.body.data).toHaveLength(1);
		expect(postsResByID.body.data[0].name).toBe("seedPost");
	});

	// --- GET TEST (/user/:id/posts) --- //
	it("should GET a user from the users database", async () => {
		//STEP 1 - check that truncate worked
		let truncateUsersTest = await db("users");
		expect(truncateUsersTest).toHaveLength(0);
		//-IF- expect(truncateUsersTest).toHaveLength(1);

		let truncatePostsTest = await db("posts");
		expect(truncatePostsTest).toHaveLength(0);
		//-IF- expect(truncatePostsTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const loginTestVar = await db("users");
		expect(loginTestVar).toHaveLength(1);
		expect(loginTestVar[0].username).toBe("loginTestUser");
		//-IF- expect(loginTestVar[0].id).toBe(2);

		//STEP 4 - login the previously created user and set to a variable
		let res = await request(server).post("/api/expat/auth/login").send({
			username: "loginTestUser",
			password: "123456",
		});

		//STEP 5 - check that the user exists and information is valid
		expect(res.body.user.id).toBe(1);
		expect(res.body.user.username).toBe("loginTestUser");
		//-IF- expect(res.body.user.username).toBe("registerTestUser");

		//STEP 6 - check that token is returned
		let token = res.body.token;
		console.log(token);

		//STEP 7 - use token to post a post
		await request(server)
			.post("/api/expat/auth/protected/posts")
			.set({ Authorization: token })
			.send({
				id: 1,
				viewable: false,
				user_id: 1,
				name: "seedPost",
				title: "seedTitle",
				rating: 5,
				location: "seedLocation",
				contact: "seedContact",
				date: "seedDate",
				notes: "seedNotes",
			});

		//STEP 8 - check is the above post is in the post database
		let postTest4 = await db("posts");
		expect(postTest4).toHaveLength(1);
		//-IF- expect(postTest4).toHaveLength(2);

		//STEP 9 - use token to get a post under a specific user
		let postsByUserID = await request(server)
			.get("/api/expat/auth/protected/user/1/posts")
			.set({ Authorization: token });

		//STEP 10 - check that the post was returned
		//console.log(postsByUserID.body);
		//console.log(postsByUserID.body[0]);
		expect(postsByUserID.body[0].id).toBe(1);
		expect(postsByUserID.body[0].name).toBe("seedPost");
	});
});
