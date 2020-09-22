exports.seed = function (knex) {
	return knex("posts").insert([
		{
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
		},
	]);
};
