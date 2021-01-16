import {Todo} from '../Api'
const getTodos : () => Promise<Todo[]> = jest.fn(() => new Promise(resolve => resolve([{id: "1", text: "Mocked Todo", done: false}])));
const apiFn = (todo: Todo) =>
  new Promise((resolve) => {
    resolve(todo);
  });
  const addTodo = apiFn;
  const deleteTodo = apiFn;
  const toggleTodo = apiFn;
// export {getTodos};
export {getTodos, addTodo, deleteTodo, toggleTodo};