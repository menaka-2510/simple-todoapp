const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
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