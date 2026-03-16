const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_db",
  password: "postgres",   // உங்கள் real password
  port: 5432,
});

app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos");
  res.json(result.rows);
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  await pool.query("INSERT INTO todos(task) VALUES($1)", [task]);
  res.send("Task added");
});


app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id=$1", [id]);
    res.send("Deleted");
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});