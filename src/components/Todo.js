import React from "react";

export default function Todo({ todo, toggleTodo }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleTodo(todo.id)}
        />
        {todo.name}
      </label>
    </div>
  );
}
