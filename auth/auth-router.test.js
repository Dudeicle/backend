const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/db-config.js");

// -IF- === Intentional Failure

describe("testing auth-router registry and login", () => {
	// truncate
	beforeEach(async () => {
		await db("users").truncate();
	});

	it("should register a user", async () => {
		//STEP 1 - check that truncate worked
		let truncateTest = await db("users");
		expect(truncateTest).toHaveLength(0);
		//-IF- expect(truncateTest).toHaveLength(1);

		//STEP 2 - register a new user
		await request(server).post("/api/expat/auth/register").send({
			username: "registerTestUser",
			password: "123456",
		});

		//STEP 3 - check that user exists in the database
		const registerTestVar = await db("users");
		expect(registerTestVar).toHaveLength(1);
		expect(registerTestVar[0].username).toBe("registerTestUser");
		//-IF- expect(registerTestVar).toHaveLength(2);

		//db("users").truncate();
	});

	it("should login a user", async () => {
		//STEP 1 - check that truncate worked
		let truncateTest2 = await db("users");
		expect(truncateTest2).toHaveLength(0);
		//-IF- expect(truncateTest2).toHaveLength(1);

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
	});
});
