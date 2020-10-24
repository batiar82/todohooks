import { useState } from "react";
import uuid from "react-uuid";

export const useTodos = (
  onAddTodo = defaultFn,
  onDoneTodo = defaultFn,
  onDeleteTodo = defaultFn
) => {
  const [todos, setTodos] = useState([
    { text: "Do Shopping", id: uuid(), done: false },
    { text: "Pay taxes", id: uuid(), done: false },
  ]);

  const addTodo = (todoText) => {
    const newTodo = { text: todoText, id: uuid(), done: false };
    setTodos([...todos, newTodo]);
    onAddTodo(newTodo);
  };

  const actionTodo = ({ action, id }) => {
    const todoToAction = getTodoById(id, todos);
    switch (action) {
      case "TOGGLE":
        setTodos(
          todos.map((todo) => {
            return todo.id === id ? { ...todo, done: !todo.done } : todo;
          })
        );
        onDoneTodo(todoToAction);
        break;
      case "DELETE":
        setTodos(todos.filter((todo) => todo.id !== id));
        onDeleteTodo(todoToAction);
        break;
      default:
        return;
    }
  };
  return { todos, addTodo, actionTodo };
};

const getTodoById = (id, todos) => todos.find((todo) => todo.id === id);
const defaultFn = () => {};
