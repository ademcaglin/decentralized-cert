import React, { memo } from "react";
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

export default Layout;
