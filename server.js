const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const db = require("./src/backend/queries/queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
// app.use(urlencoded({ extended: false }));
// app.use(cors());

// import { createConnection } from "mysql";
// var con = createConnection({
//   host: "fyp-secure-online-exam.chxwnjds4a1w.ap-southeast-1.rds.amazonaws.com",
//   user: "masterusername",
//   password: "masterpassword",
//   database: "fyp-secure-online-exam",
//   port: "5432",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// app.get("/", (req, res) => {
//   res.json("OK");
// });

// app.listen(3001, () => {
//   console.log("Server running on port 3001");
// });
