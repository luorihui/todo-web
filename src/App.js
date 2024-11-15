// App.js
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreate = async (newTodo) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos([...todos, data.todo]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdate = async (updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${updatedTodo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      setTodos(todos.map(todo => todo._id === data._id ? data : todo));
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (todoIds) => {
    try {
      let newTodos = todos;
      for (const id of todoIds) {
        await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
        newTodos = newTodos.filter(todo => todo._id != id);
      }
      setTodos(newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <button onClick={() => setIsCreating(true)} className="create-button">Create New Todo</button>
      <div className="content">
        <TodoList
          todos={todos}
          onSelect={setSelectedTodo}
          onDelete={handleDelete}
        />
        {(selectedTodo || isCreating) && (
          <TodoForm
            todo={selectedTodo}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() => {
              setSelectedTodo(null);
              setIsCreating(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;