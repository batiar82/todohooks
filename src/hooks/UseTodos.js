import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTodos,
  addTodo as postTodo,
  deleteTodo,
  toggleTodo,
} from "../util/Api";
export const ADD_TODO = "ADD";
export const TOGGLE_TODO = "TOGGLE";
export const DELETE_TODO = "DELETE";
const TODOS_QUERY = "todos";
export const useTodos = (
  callbacks = {
    onAdd: defaultFn,
    onToggle: defaultFn,
    onDelete: defaultFn,
  }
) => {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery(TODOS_QUERY, getTodos);
  
  const { mutate: addMutation } = useMutation(postTodo, {
    onSuccess: (newTodo) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(TODOS_QUERY);
      callbacks.onAdd(newTodo);
    },
  });

  const { mutate: deleteMutation } = useMutation(deleteTodo, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(TODOS_QUERY);
      callbacks.onDelete(data);
    },
  });
  
  const { mutate: toggleMutation } = useMutation(toggleTodo, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(TODOS_QUERY);
      callbacks.onToggle(data);
    },
  });

  const actionTodo = ({ action, todo }) => {
    switch (action) {
      case ADD_TODO:
        addMutation(todo);
        break;
      case TOGGLE_TODO:
        toggleMutation(todo);
        break;
      case DELETE_TODO:
        deleteMutation(todo);
        break;
      default:
        return;
    }
  };
  return { todos: data, isLoading, actionTodo };
};

const defaultFn = () => {};
