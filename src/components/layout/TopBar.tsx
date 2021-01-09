import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListIcon from "@material-ui/icons/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <ListIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          React Hooks Todo List
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
