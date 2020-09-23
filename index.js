require("dotenv").config();

const server = require("./api/server.js");

//// deployment with Postgres port ////
// const port = process.env.PORT || 5432;

//// testing and development port ////
const port = 5000;

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
