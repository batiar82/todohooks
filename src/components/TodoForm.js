import React, {useState, Fragment } from "react";
import {Button, TextField} from '@material-ui/core'
const TodoForm = ({addTodo}) => {
    const [text, setText] = useState('');
    const onSubmit = () =>{
        addTodo(text);
        setText('');
    }
    return ( <>
        <TextField id="outlined-basic" label="New Todo" variant="outlined" value={text} onChange={event => setText(event.target.value)}/>
        <Button color="primary" onClick={onSubmit} disabled={!text.length}>Submit</Button>
    </> );
}
 
export default TodoForm;