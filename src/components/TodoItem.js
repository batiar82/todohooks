import React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DeleteIcon from '@material-ui/icons/Delete'
const TodoItem = ({todo, actionTodo}) => {
    const onDelete = () =>{
        actionTodo({action: 'DELETE', id: todo.id});
    }
    const onDone = () =>{
        actionTodo({action: 'TOGGLE', id: todo.id});
    }
    
    return ( <ListItem button divider style={{ textDecoration : todo.done ? 'line-through' : 'none' }} >
        <ListItemIcon>
            <InboxIcon />            
          </ListItemIcon>
        <ListItemText primary={todo.text} onClick={onDone} />
        <ListItemIcon >
            <DeleteIcon onClick={onDelete}/>            
          </ListItemIcon>
        
      </ListItem> );
}
 
export default TodoItem;