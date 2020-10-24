import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";

const initialValues = { text: "" };

const TodoFormformik = ({ addTodo }) => {
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
        setTimeout(() => {
          addTodo(values.text);
          setSubmitting(false);
          resetForm(initialValues);
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
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
