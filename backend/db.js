const mongoose = require("mongoose");

const connectToMongo = (URI) => {
  mongoose.connect(URI);
};

const todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: { type: Boolean, default: false },
});
const Todo = mongoose.model("Todo", todoSchema);
// Todo Schema

module.exports = { Todo,connectToMongo };
