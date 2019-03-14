/*import React, { memo } from "react";
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Paper, ListItem, ListItemText} from "@material-ui/core";

const Layout = memo(props => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
  >
    <AppBar color="primary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64 }}>
        <Typography color="inherit">TODO APP</Typography>
        <Link to="/verify">Verify</Link>
        <ListItem component={Link} to="/create" button>
            <ListItemText primary="Ana Sayfa" />
        </ListItem>
      </Toolbar>
    </AppBar>
    {props.children}
  </Paper>
));

export default Layout;*/

import React, {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuItem: {
    color: 'white'
  }
};

const Layout = memo(props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
              Signer Application
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button> 
          <Button color="inherit" component={Link} to="/create">Save Certificate</Button>     
         
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
)
});

export default withStyles(styles)(Layout);
