import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTodos,
  addTodo as postTodo,
  deleteTodo,
  toggleTodo,
} from "../util/Api";
import {Todo, useTodosCallbackParam, TodosAction, Types} from "../types/Types"
const TODOS_QUERY = "todos";

export const useTodos = (callbacks: useTodosCallbackParam) => {
  const {
    onAdd = defaultFn,
    onDelete = defaultFn,
    onToggle = defaultFn,
  } = callbacks;
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery(TODOS_QUERY, getTodos);

  const { mutate: addMutation } = useMutation(postTodo, {
    onSuccess: (newTodo) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(TODOS_QUERY);
      onAdd(newTodo);
    },
  });

  const { mutate: deleteMutation } = useMutation(deleteTodo, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(TODOS_QUERY);
      onDelete(data);
    },
  });

  const { mutate: toggleMutation } = useMutation(toggleTodo, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(TODOS_QUERY);
      onToggle(data);
    },
  });

  const actionTodo = ({ type, todo } : TodosAction) => {
    switch (type) {
      case Types.ADD:
        addMutation(todo);
        break;
      case Types.TOGGLE:
        toggleMutation(todo);
        break;
      case Types.DELETE:
        deleteMutation(todo);
        break;
      default:
        return;
    }
  };
  return { todos: data, isLoading, actionTodo };
};

const defaultFn = (todo: Todo) => {};
