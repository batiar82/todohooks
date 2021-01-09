import React from "react";
import { render, cleanup } from "@testing-library/react";
import { useTodos, TOGGLE_TODO, DELETE_TODO } from "./UseTodos";
import { act } from "react-dom/test-utils";
const Todos = ({ children, ...rest }) => {
  const params = Object.keys(rest).length > 0 || undefined;
  return children(useTodos(params));
};

const setup = (props) => {
  const returnVal = {};
  render(
    <Todos {...props}>
      {(val) => {
        Object.assign(returnVal, val);
        return null;
      }}
    </Todos>
  );
  return returnVal;
};

afterEach(cleanup);

test("useTodos", () => {
  const todoData = setup();
  expect(todoData.todos.length).toBe(2);
  act(() => todoData.addTodo("Do Something"));
  expect(todoData.todos.length).toBe(3);
  expect(todoData.todos[2].text).toBe("Do Something");
  act(() =>
    todoData.actionTodo({ action: TOGGLE_TODO, id: todoData.todos[0].id })
  );
  expect(todoData.todos[0].done).toBe(true);
  act(() =>
    todoData.actionTodo({ action: TOGGLE_TODO, id: todoData.todos[0].id })
  );
  expect(todoData.todos[0].done).toBe(false);
  act(() =>
    todoData.actionTodo({ action: DELETE_TODO, id: todoData.todos[2].id })
  );
  expect(todoData.todos.length).toBe(2);
});
