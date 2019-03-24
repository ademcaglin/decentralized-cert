import React, { useContext, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { ListContext } from './ListContext';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const View = (props) => {
  const { classes } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const context = useContext(ListContext);

  function handleClose() {
    context.setState({ openView: false });
  }

  return (
    <Dialog
      fullScreen
      open={context.openView}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
          
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
        {context.viewCer.issuer}
        </Typography>
        <Typography component="p">
          {context.viewCer.date_of_issue}
        </Typography>
        <Divider variant="left" />
        <Document file={context.viewCer.file}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Paper>
      </Grid>
      <Grid container justify="center">
        
      </Grid>
    </Dialog>
  );
}

export default withStyles(styles)(View);