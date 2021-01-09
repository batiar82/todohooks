import { Button, TextField } from "@material-ui/core";
import { Formik, FormikErrors } from "formik";
import React from "react";
import { Types, TodosAction } from "../hooks/UseTodos";
import { Todo } from "../util/Api";
const initialValues: Todo = { text: "", done: false };
type Props = {
  actionTodo: (action: TodosAction) => void;
};
const TodoFormformik: React.FC<Props> = ({ actionTodo }) => {
  return (
    <Formik<Todo>
      initialValues={initialValues}
      validate={(values) => {
        const errors: FormikErrors<Todo> = {};
        if (!values.text) {
          errors.text = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        actionTodo({ type: Types.ADD, todo: values });
        setSubmitting(false);
        resetForm({ values: initialValues });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          <TextField
            id="outlined-basic"
            name="text"
            label="New Todo"
            multiline
            rows={4}
            variant="outlined"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            color="primary"
            onClick={() =>handleSubmit()}
            disabled={!values.text.length || isSubmitting}
          >
            Submit
          </Button>
        </>
      )}
    </Formik>
  );
};

export default TodoFormformik;
