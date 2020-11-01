import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DELETE_TODO, TOGGLE_TODO } from '../hooks/UseTodos';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const TodoItem = ({todo, actionTodo}) => {
    const classes = useStyles();

    const onDelete = () =>{
        actionTodo({action: DELETE_TODO, id: todo.id});
    }
    const onDone = () =>{
        actionTodo({action: TOGGLE_TODO, id: todo.id});
    }
    return ( 
        <Grid item xs={12} sm={6} md={4}>
        <Card>
        <CardMedia className={classes.media}
          image={`https://picsum.photos/200?random=${todo.id}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {todo.text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={onDone}>
            {todo.done ? 'Undo' : 'Done!'}
          </Button>
          <Button size="small" color="primary" onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      </Grid>
    );
}
 
export default TodoItem;