import { useEffect, useState } from "react";
import firebase from '../util/firebase'
import uuid from "react-uuid";
export const TOGGLE_TODO = 'TOGGLE';
export const DELETE_TODO = 'DELETE';

export const useTodos = (callbacks = {
  onAdd: defaultFn,
  onToggle: defaultFn,
  onDelete: defaultFn
}
) => {
  const [todos, setTodos] = useState([]);

  useEffect( () => {
    firebase.firestore().collection("todos").get()
      .then(res => {
          console.log('getting', res);
          if(res.empty)
          {
            setTodos([
              { text: "Do Shopping", id: uuid(), done: false },
              { text: "Pay taxes", id: uuid(), done: false },
            ]);
          } else {
          const newTodos = [];
          res.forEach(doc => newTodos.push({id: doc.id, text:doc.data().text, done: doc.data().done}))
          setTodos(newTodos);
          }
      })
      
   }, []);


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
