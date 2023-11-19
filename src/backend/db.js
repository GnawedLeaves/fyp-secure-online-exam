const { Pool } = require("pg");

const pool = new Pool({
  host: "fyp-secure-online-exam.chxwnjds4a1w.ap-southeast-1.rds.amazonaws.com",
  user: "masterusername",
  password: "masterpassword",
  database: "fypsecureonlineexam",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
};
