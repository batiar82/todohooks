import React, { Fragment } from "react";
import TodoItem from "./TodoItem";
import { List, Paper } from "@material-ui/core";

const TodoList = ({todos, actionTodo}) => {
    return ( <Paper elevation={3} style={{width: '50%'}}><List component="nav" aria-label="main mailbox folders">
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} actionTodo={actionTodo} />)}
    </List></Paper> );
}
 
export default TodoList;