import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function App() {
  const LOCAL_STORAGE_KEY = "todoApp.todos";
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos([...todos]);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name, complete: false }];
    });
    todoNameRef.current.value = "";
  }

  function handleClearTodos() {
    const afterClear = todos.filter((todo) => !todo.complete);
    setTodos(afterClear);
  }

  return (
    <>
      <h1>TodoList</h1>
      <input ref={todoNameRef} type="text" />
      <Button onClick={handleAddTodo}>Add</Button>
      <Button onClick={handleClearTodos}>Clear Completed</Button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  );
}

export default App;
