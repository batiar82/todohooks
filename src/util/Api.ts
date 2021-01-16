import todoCollection from "./Firebase";
import { v4 as uuidv4 } from 'uuid';
import {Todo} from "../types/Types"

const getTodos : () => Promise<Todo[]> = () => {
  return new Promise((resolve, reject) => {
    todoCollection
      .get()
      .then((res) => {
        if (res.empty) {
          console.warn("res is empty, returning default todos");
          resolve([
            { text: "Do Shopping", id: uuidv4(), done: false },
            { text: "Pay taxes", id: uuidv4(), done: false },
          ]);
        } else {
          const newTodos : Todo[] = [];
          res.forEach((doc) =>
            newTodos.push({
              id: doc.id,
              text: doc.data().text,
              done: doc.data().done,
            })
          );
          resolve(newTodos);
        }
      }).catch(reject);
  });
};

const addTodo = async (todo: Todo) => {
    await todoCollection.add(todo);
    return todo;
} 

const deleteTodo = async (todo : Todo) => {
    await todoCollection.doc(todo.id).delete();
    return todo;
} 

const toggleTodo = async (todo: Todo) => {
    await todoCollection.doc(todo.id).update({done: !todo.done});
    return todo;
    
} 

export {getTodos, addTodo, deleteTodo, toggleTodo};
