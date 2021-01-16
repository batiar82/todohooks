import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import {Types} from "../types/Types"
describe("Todo Item", () => {
  it("renders a todo item", () => {
    const todo = { id: "1", text: "foo", done: false };
    const actionTodoMock = jest.fn();
    const { getByText, rerender } = render(
      <TodoItem todo={todo} actionTodo={actionTodoMock} />
    );
    const textElement = getByText(/foo/i);
    expect(textElement).toBeInTheDocument();

    let doneElement = getByText("Done!");
    expect(doneElement).toBeInTheDocument();
    todo.done = true;
    rerender(<TodoItem todo={todo} actionTodo={actionTodoMock} />);
    doneElement = getByText("Undo");
    expect(doneElement).toBeInTheDocument();
    expect(actionTodoMock.mock.calls.length).toBe(0);
  });
  it('Calls actionTodo to delete', () =>{
    const todo = { id: "1", text: "foo", done: false };
    const actionTodoMock = jest.fn();
    const { getByText } = render(
      <TodoItem todo={todo} actionTodo={actionTodoMock} />
    );
    const deleteButton = getByText("Delete");
    expect(actionTodoMock.mock.calls.length).toBe(0);
    fireEvent.click(deleteButton);
    expect(actionTodoMock.mock.calls.length).toBe(1);
    expect(actionTodoMock.mock.calls[0][0]).toMatchObject({type: Types.DELETE, todo})
  })
  it('Calls actionTodo to toggle', () =>{
    const todo = { id: "1", text: "foo", done: false };
    const actionTodoMock = jest.fn();
    const { getByText } = render(
      <TodoItem todo={todo} actionTodo={actionTodoMock} />
    );
    const doneButton = getByText("Done!");
    expect(actionTodoMock.mock.calls.length).toBe(0);
    fireEvent.click(doneButton);
    expect(actionTodoMock.mock.calls.length).toBe(1);
    expect(actionTodoMock.mock.calls[0][0]).toMatchObject({type: Types.TOGGLE, todo})
  })
});
