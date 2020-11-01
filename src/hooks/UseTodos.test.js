import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {useTodos} from './UseTodos';
import { act } from 'react-dom/test-utils';
const Todos = ({children, ...rest}) => children(useTodos())

function setup(props) {
    const returnVal = {};
    render(<Todos {...props} 
        >{val => {
        Object.assign(returnVal,val);
        return null;
    }}</Todos>)
    return returnVal;
}

afterEach(cleanup);

test('useTodos', ()=> 
{
    const todoData = setup();
    expect(todoData.todos.length).toBe(2);
    act(() => todoData.addTodo("Do Something"));
    expect(todoData.todos.length).toBe(3);
    expect(todoData.todos[2].text).toBe("Do Something");
    act(() => todoData.actionTodo({action: "TOGGLE", id: todoData.todos[0].id}));
    expect(todoData.todos[0].done).toBe(true);
    act(() => todoData.actionTodo({action: "TOGGLE", id: todoData.todos[0].id}));
    expect(todoData.todos[0].done).toBe(false);
    act(() => todoData.actionTodo({action: "DELETE", id: todoData.todos[2].id}));
    expect(todoData.todos.length).toBe(2);

})