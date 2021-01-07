import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { ADD_TODO } from "../hooks/UseTodos";

const initialValues = { text: "", done: false };

const TodoFormformik = ({ actionTodo }) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.text) {
          errors.text = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        actionTodo({ action: ADD_TODO, todo: values });
        setSubmitting(false);
        resetForm(initialValues);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
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
            onClick={handleSubmit}
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
