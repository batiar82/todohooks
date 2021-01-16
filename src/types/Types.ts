export type Todo = {
  id?: string;
  text: string;
  done?: boolean;
};

export enum Types {
  ADD = "ADD",
  DELETE = "DELETE",
  TOGGLE = "TOGGLE",
}
export type TodosAction = { type: Types; todo: Todo };
export type UseTodosCallback = (todo: Todo) => void;
export type useTodosCallbackParam = {
  onAdd?: UseTodosCallback;
  onDelete?: UseTodosCallback;
  onToggle?: UseTodosCallback;
};
