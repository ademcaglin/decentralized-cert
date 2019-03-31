import React, {memo, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";

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
              Signer App
          </Typography>
          <Button color="inherit" component={Link} to="/"><Icon className={classes.icon}>home</Icon></Button> 
          <Button color="inherit" component={Link} to="/create"><Icon className={classes.icon}>add</Icon></Button>    
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
)
});

export default withStyles(styles)(Layout);
