import React from "react";
import TodoItem from "./TodoItem";
import Grid from "@material-ui/core/Grid";
import {Todo, TodosAction} from '../types/Types'
type Props = {
  todos: Todo[],
  isLoading: boolean,
  actionTodo: (action: TodosAction) => void;

}
const TodoList : React.FC<Props> = ({ todos, isLoading, actionTodo }) => {
  if (isLoading) return (<div>Loading...</div>)
  return (
    <Grid container spacing={4}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} actionTodo={actionTodo} />
      ))}
    </Grid>
  );
};

export default TodoList;
