const express = require("express");
const app = express();
const PORT = 3000;
const { Todo, connectToMongo } = require("./db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

connectToMongo("mongodb://localhost:27017/todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
    description: req.body.description,
  });
  await newTodo.save();
  res.json(newTodo);
});

app.put("/todos/:id/complete", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  //   await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
