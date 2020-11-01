import { useState } from "react";
import uuid from "react-uuid";
export const TOGGLE_TODO = 'TOGGLE';
export const DELETE_TODO = 'DELETE';

export const useTodos = (callbacks = {
  onAdd: defaultFn,
  onToggle: defaultFn,
  onDelete: defaultFn
}
) => {
  const [todos, setTodos] = useState([
    { text: "Do Shopping", id: uuid(), done: false },
    { text: "Pay taxes", id: uuid(), done: false },
  ]);

  const addTodo = (todoText) => {
    const newTodo = { text: todoText, id: uuid(), done: false };
    setTodos([...todos, newTodo]);
    callbacks.onAdd(newTodo);
  };

  const actionTodo = ({ action, id }) => {
    const todoToAction = getTodoById(id, todos);
    switch (action) {
      case TOGGLE_TODO:
        setTodos(
          todos.map((todo) => {
            return todo.id === id ? { ...todo, done: !todo.done } : todo;
          })
        );
        callbacks.onToggle(todoToAction);
        break;
      case DELETE_TODO:
        setTodos(todos.filter((todo) => todo.id !== id));
        callbacks.onDelete(todoToAction);
        break;
      default:
        return;
    }
  };
  return { todos, addTodo, actionTodo };
};

const getTodoById = (id, todos) => todos.find((todo) => todo.id === id);
const defaultFn = () => {};
