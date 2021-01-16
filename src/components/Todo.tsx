import React, { useContext } from "react";
import TodoFormFormik from "./TodoFormFormik";
import TodoList from "./TodoList";
import Container from "@material-ui/core/Container";
import { SnackbarContext } from "./SnackbarContext";
import { makeStyles } from "@material-ui/core/styles";
import { useTodos } from "../hooks/UseTodos";
import { Todo } from "../types/Types";

const useStyles = makeStyles((theme) => ({
  todoForm: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    display: "flex",
    height: "200",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const Todos = () => {
  const classes = useStyles();
  const [openSnackbar] = useContext(SnackbarContext);

  const onAdd = ({ text } : Todo) => openSnackbar(`Created "${text}" todo`);
  const onToggle = ({ text } : Todo) => openSnackbar(`Toggled "${text}" todo`);
  const onDelete = ({ text } : Todo) => openSnackbar(`Deleted "${text}" todo`);

  const { todos, isLoading, actionTodo } = useTodos({onAdd, onDelete, onToggle});
  return (
    <>
      <Container maxWidth="sm" className={classes.todoForm}>
        <TodoFormFormik actionTodo={actionTodo} />
      </Container>
      <TodoList todos={todos} isLoading = {isLoading} actionTodo={actionTodo} />
    </>
  );
};

export default Todos;
