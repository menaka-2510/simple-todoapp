import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios.get("http://localhost:5000/todos")
      .then(res => setTodos(res.data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    if(!task) return;

    axios.post("http://localhost:5000/todos", { task })
      .then(() => {
        setTask("");
        fetchTodos();
      });
  };

  const deleteTodo = (id) => {
  axios.delete(`http://localhost:5000/todos/${id}`)
    .then(() => {
      fetchTodos();
    });
};

  return (
    <div className="container">

      <h1 className="title">Todo List</h1>

      <div className="input-box">
        <input
          value={task}
          onChange={(e)=>setTask(e.target.value)}
          placeholder="Enter task"
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">

            <span className="task-text">
              {todo.task}
            </span>

<i
  className="fas fa-trash delete-icon"
  onClick={() => deleteTodo(todo.id)}
></i>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;