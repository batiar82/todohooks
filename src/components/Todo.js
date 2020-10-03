import React, { Fragment, useState, useContext } from "react";
import uuid from 'react-uuid'
import TodoFormFormik from "./TodoFormFormik";
import TodoList from "./TodoList";
import { Paper } from "@material-ui/core";
import { SnackbarContext } from "./SnackbarContext";
const Todos = () => {
    const [todos, setTodos] = useState([{text: 'Do Shopping', id: uuid(), done: false}]);
    const [openSnackbar] = useContext(SnackbarContext);
    const addTodo = todoText => {
        setTodos([...todos, {text: todoText, id: uuid(), done: false}]);
        openSnackbar(`Created ${todoText} todo`);
    }
    const actionTodo = ({action, id}) => {
        switch (action) {
            case 'TOGGLE': {setTodos(todos.map(todo => {
                return todo.id === id ? {...todo, done: !todo.done} : todo
            }))
            openSnackbar(`Done ${id} todo`);}
            break;
            case 'DELETE': {setTodos(todos.filter(todo => todo.id !== id))
                openSnackbar(`Deleted ${id} todo`);}
            break;
            default: return;
        }
    }
    return ( <Paper elevation={1} style={{height: '80%'}}>
        {console.log('render')}
        <TodoFormFormik addTodo={addTodo} />
        <TodoList todos={todos} actionTodo={actionTodo} />
    </Paper> );
}
 
export default Todos;