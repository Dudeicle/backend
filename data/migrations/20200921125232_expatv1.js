exports.up = function (knex) {
	return knex.schema
		.createTable("users", (tbl) => {
			tbl.increments("id");
			tbl.string("username").notNullable().unique();
			tbl.string("password").notNullable();
		})
		.createTable("posts", (tbl) => {
			tbl.increments("id");
			tbl.boolean("viewable").defaultTo(false);
			tbl
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("users.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.text("name").notNullable();
			tbl.text("title").notNullable();
			tbl.integer("rating").notNullable();
			tbl.text("location");
			tbl.text("contact");
			tbl.date("date");
			tbl.text("notes");
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
