import todoCollection from "./Firebase";
import uuid from "react-uuid";

const getTodos = () => {
  return new Promise((resolve, reject) => {
    todoCollection
      .get()
      .then((res) => {
        if (res.empty) {
          console.warn("res is empty, returning default todos");
          resolve([
            { text: "Do Shopping", id: uuid(), done: false },
            { text: "Pay taxes", id: uuid(), done: false },
          ]);
        } else {
          const newTodos = [];
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

const addTodo = async (todo) => {
    await todoCollection.add(todo);
    return todo;
} 

const deleteTodo = async (todo) => {
    await todoCollection.doc(todo.id).delete();
    return todo;
} 

const toggleTodo = async (todo) => {
    await todoCollection.doc(todo.id).update({done: !todo.done});
    return todo;
    
} 

export {getTodos, addTodo, deleteTodo, toggleTodo};
