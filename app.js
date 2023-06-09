const express = require("express");
const path = require("path");

const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "todoApplication.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/todos/", async (Request, response) => {
  const getTodos = `SELECT * FROM todo;`;
  const todos = await db.all(getTodos);
  response.send(todos);
});
