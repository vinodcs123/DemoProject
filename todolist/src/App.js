import React, { useState } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      if (isEditing) {
        updateTask(currentTaskIndex);
      } else {
        setTasks([...tasks, { text: task, isCompleted: false }]);
        setTask("");
      }
    }
  };

  const updateTask = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, text: task } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setTask("");
    setCurrentTaskIndex(null);
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
        />
        <button onClick={addTask}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.isCompleted ? "completed" : ""}>
            <span onClick={() => completeTask(index)}>{task.text}</span>
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
