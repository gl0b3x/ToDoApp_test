import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleChange = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main className="todo-app">
      <div className="background-image" />
      <section className="main-section">
        <header className="container-article">
          <h1 className="article">todo</h1>
          <span className="theme-toggle">
            <img src="/images/icon-moon.svg" alt="toggle" />
          </span>
        </header>
        <div className="todo-content">
          <div className="new-todo">
            <label className="custom-checkbox">
              <input type="checkbox" className="new-todo-checkBox" disabled />
              <span className="checkmark">
                <img src="/images/icon-check.svg" alt="checkmark" />
              </span>
            </label>
            <input
              type="text"
              className="new-todo-input"
              placeholder="Create a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            />
          </div>
          <div className="tasks-menu-wrapper">
            <div className="todo-tasks">
              {filteredTodos.map((todo, index) => (
                <div className="todo-task" key={index}>
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="new-todo-checkBox"
                      checked={todo.completed}
                      onChange={() => handleChange(index)}
                    />
                    <span className="checkmark">
                      <img src="/images/icon-check.svg" alt="checkmark" />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`todo-input ${todo.completed ? "done-task" : ""}`}
                    value={todo.text}
                    readOnly
                    onClick={() => handleDelete(index)}
                  />
                  <span
                    className="delete-task"
                    onClick={() => handleDelete(index)}
                  >
                    <img src="/images/icon-cross.svg" alt="delete task" />
                  </span>
                </div>
              ))}
            </div>
            <div className="menu">
              <span className="quantity-tasks">
                {todos.filter((todo) => !todo.completed).length} items left
              </span>
              <div className="filters">
                <span
                  className={`filter-option ${filter === "all" ? "active-filter" : "not-active-filter"}`}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </span>
                <span
                  className={`filter-option ${filter === "active" ? "active-filter" : "not-active-filter"}`}
                  onClick={() => handleFilterChange("active")}
                >
                  Active
                </span>
                <span
                  className={`filter-option ${filter === "completed" ? "active-filter" : "not-active-filter"}`}
                  onClick={() => handleFilterChange("completed")}
                >
                  Completed
                </span>
              </div>
              <span
                className="not-active-filter"
                onClick={handleClearCompleted}
              >
                Clear completed
              </span>
            </div>
          </div>
          <div className="mobile-menu">
            <div className="mobile-filters">
              <span
                className={`filter-option ${filter === "all" ? "active-filter" : "not-active-filter"}`}
                onClick={() => handleFilterChange("all")}
              >
                All
              </span>
              <span
                className={`filter-option ${filter === "active" ? "active-filter" : "not-active-filter"}`}
                onClick={() => handleFilterChange("active")}
              >
                Active
              </span>
              <span
                className={`filter-option ${filter === "completed" ? "active-filter" : "not-active-filter"}`}
                onClick={() => handleFilterChange("completed")}
              >
                Completed
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
