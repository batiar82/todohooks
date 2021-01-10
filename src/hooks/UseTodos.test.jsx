import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useTodos } from "./UseTodos";
import * as api from "../util/Api";
import { QueryClient, QueryClientProvider } from "react-query";
let wrapper;
let addTodoMock;
let deleteTodoMock;
let toggleTodoMock;
const apiFn = (todo) =>
  new Promise((resolve) => {
    resolve(todo);
  });
beforeEach(() => {
  api.getTodos = () =>
    new Promise((resolve) => {
      resolve([{ id: "1", text: "fooo", done: false }]);
    });

  api.addTodo = apiFn;
  api.deleteTodo = apiFn;
  api.toggleTodo = apiFn;

  addTodoMock = jest.fn();
  deleteTodoMock = jest.fn();
  toggleTodoMock = jest.fn();

  wrapper = ({ children }) => {
    return (
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    );
  };
});

test("should display and hide loading", async () => {
  const { result, waitFor } = renderHook(() => useTodos(), { wrapper });
  expect(result.current.isLoading).toBe(true);
  expect(result.current.todos).toBe(undefined);
  await waitFor(() => {
    return !result.current.isLoading;
  });
  expect(result.current.isLoading).toBe(false);
  expect(result.current.todos).toHaveLength(1);
});
jest.useFakeTimers();
describe("todo actions", () => {
  it("adds todo", async () => {
    let called = 0;
    api.getTodos = () =>
      new Promise((resolve) => {
        if (called === 0) {
          called++;
          resolve([{ id: "1", text: "fooo", done: false }]);
        } else {
          resolve([
            { id: "1", text: "fooo", done: false },
            { id: "2", text: "new foo", done: false },
          ]);
        }
      });

    const { result, waitFor, waitForValueToChange } = renderHook(
      () =>
        useTodos({
          onAdd: addTodoMock,
          onDelete: deleteTodoMock,
          onToggle: toggleTodoMock,
        }),
      { wrapper }
    );
    expect(result.current.todos).toBe(undefined);
    await waitFor(() => {
      return !result.current.isLoading;
    });

    expect(result.current.todos).toHaveLength(1);
    expect(addTodoMock.mock.calls.length).toBe(0);
    result.current.actionTodo({
      action: "ADD",
      todo: { id: "2", text: "new foo", done: false },
    });
    await waitForValueToChange(() => result.current.todos);
    expect(result.current.todos).toHaveLength(2);
    expect(addTodoMock.mock.calls.length).toBe(1);
    expect(deleteTodoMock.mock.calls.length).toBe(0);
    expect(toggleTodoMock.mock.calls.length).toBe(0);
  });

  it("deletes a todo", async () => {
    let called = 0;
    api.getTodos = () =>
      new Promise((resolve) => {
        if (called === 0) {
          called++;
          resolve([{ id: "1", text: "fooo", done: false }]);
        } else {
          resolve([]);
        }
      });

    const { result, waitFor, waitForValueToChange } = renderHook(
      () =>
        useTodos({
          onAdd: addTodoMock,
          onDelete: deleteTodoMock,
          onToggle: toggleTodoMock,
        }),
      { wrapper }
    );
    expect(result.current.todos).toBe(undefined);
    await waitFor(() => {
      return !result.current.isLoading;
    });

    expect(result.current.todos).toHaveLength(1);
    expect(deleteTodoMock.mock.calls.length).toBe(0);
    result.current.actionTodo({
      action: "DELETE",
      todo: { id: "1", text: "fooo", done: false },
    });
    await waitForValueToChange(() => result.current.todos);
    expect(result.current.todos).toHaveLength(0);
    expect(addTodoMock.mock.calls.length).toBe(0);
    expect(deleteTodoMock.mock.calls.length).toBe(1);
    expect(toggleTodoMock.mock.calls.length).toBe(0);
  });

  it("toggles a todo", async () => {
    let called = 0;
    api.getTodos = () =>
      new Promise((resolve) => {
        if (called === 0) {
          called++;
          resolve([{ id: "1", text: "fooo", done: false }]);
        } else {
          resolve([{ id: "1", text: "fooo", done: true }]);
        }
      });

    const { result, waitFor, waitForValueToChange } = renderHook(
      () =>
        useTodos({
          onAdd: addTodoMock,
          onDelete: deleteTodoMock,
          onToggle: toggleTodoMock,
        }),
      { wrapper }
    );
    expect(result.current.todos).toBe(undefined);
    await waitFor(() => {
      return !result.current.isLoading;
    });

    expect(result.current.todos).toHaveLength(1);
    expect(toggleTodoMock.mock.calls.length).toBe(0);
    result.current.actionTodo({
      action: "TOGGLE",
      todo: { id: "1", text: "fooo", done: false },
    });
    await waitForValueToChange(() => result.current.todos);
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toMatchObject({
      id: "1",
      text: "fooo",
      done: true,
    });
    expect(addTodoMock.mock.calls.length).toBe(0);
    expect(deleteTodoMock.mock.calls.length).toBe(0);
    expect(toggleTodoMock.mock.calls.length).toBe(1);
  });
});
