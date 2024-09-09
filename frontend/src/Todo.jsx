import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './Todo.css'
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", description: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (newTodo.name && newTodo.description) {
      axios
        .post("http://localhost:3000/todos", newTodo)
        .then((res) => setTodos([...todos, res.data]))
        .catch((err) => console.log(err));
      setNewTodo({ name: "", description: "" });
    } else {
      alert("Please enter both Todo Name and Description");
    }
  };

  // Mark todo as complete
  const markComplete = (id) => {
    axios
      .put(`http://localhost:3000/todos/${id}/complete`)
      .then((res) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container mt-5">
        <p className="text-center h1">Todo List</p>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Todo Name"
            value={newTodo.name}
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
            style={{ fontSize: "1.2rem" }}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            style={{ fontSize: "1.2rem" }}
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add Todo
          </button>
        </div>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <strong>{todo.name}</strong> - {todo.description}
              </span>
              <div>
                {!todo.completed ? (
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => markComplete(todo._id)}
                  >
                    Complete
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
