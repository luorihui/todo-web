// components/TodoList.js
import React, { useState } from 'react';

function TodoList({ todos, onSelect, onDelete }) {
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());

  const handleCheckboxChange = (todoId, e) => {
    e.stopPropagation();
    const newSelected = new Set(selectedForDelete);
    if (e.target.checked) {
      newSelected.add(todoId);
    } else {
      newSelected.delete(todoId);
    }
    setSelectedForDelete(newSelected);
  };

  const handleBatchDelete = () => {
    const itemsToDelete = Array.from(selectedForDelete);
    if (itemsToDelete.length > 0) {
      onDelete(itemsToDelete);
      setSelectedForDelete(new Set());
    }
  };

  return (
    <div>
      {selectedForDelete.size > 0 && (
        <button 
          onClick={handleBatchDelete}
          className="delete-button"
        >
          Delete Selected ({selectedForDelete.size})
        </button>
      )}
      <table className="todo-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} onClick={() => onSelect(todo)}>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedForDelete.has(todo._id)}
                  onChange={(e) => handleCheckboxChange(todo._id, e)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;