import React, {useState, Fragment } from "react";
import {Button, TextField} from '@material-ui/core'
import { Formik } from "formik";
const TodoFormformik = ({addTodo}) => {
    // const [text, setText] = useState('');
    // const onSubmit = () =>{
    //     addTodo(text);
    //     setText('');
    //}
    return ( <Formik
        initialValues={{ text: '' }}
        validate={values => {
          const errors = {};
          if (!values.text) {
            errors.text = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            addTodo(values.text);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (<Fragment>
              <TextField id="outlined-basic" name="text" label="New Todo" variant="outlined" value={values.text} onChange={handleChange} onBlur={handleBlur}/>
              <Button color="primary" onClick={handleSubmit} disabled={!values.text.length || isSubmitting}>Submit</Button>
            {/* <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button> */}
          </Fragment>
        )}
      </Formik>
    );
}
 
export default TodoFormformik;