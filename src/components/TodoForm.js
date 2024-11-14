// components/TodoForm.js
import React, { useState, useEffect } from 'react';

function TodoForm({ todo, onCreate, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
      setStatus(todo.status || 'pending');
      setPriority(todo.priority || 'medium');
    } else {
      setName('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      onUpdate({ ...todo, name, description, status, priority });
    } else {
      onCreate({ name, description, status, priority });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{todo ? 'Update' : 'Create'}</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default TodoForm;