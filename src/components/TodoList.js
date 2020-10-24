import React from "react";
import TodoItem from "./TodoItem";
import Grid from "@material-ui/core/Grid";

const TodoList = ({ todos, actionTodo }) => {
  return (
    <Grid container spacing={4}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} actionTodo={actionTodo} />
      ))}
    </Grid>
  );
};

export default TodoList;
