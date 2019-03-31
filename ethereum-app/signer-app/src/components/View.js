import React, { useContext, useState, useEffect } from "react";
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
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { green } from "@material-ui/core/colors";
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useGetCertificate from "../core/useGetCertificate";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  success: {
    backgroundColor: green[600],
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const View = (props) => {
  const { classes, closeView, selectedHash } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const certificate = useGetCertificate(selectedHash);

  function hasCertificate() {
    return certificate &&
      Object.entries(certificate).length !== 0;
  }

  return (
    <Dialog
      fullScreen
      open={selectedHash ? true : false}
      onClose={() => closeView()}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>

          </Typography>
          <IconButton color="inherit" onClick={() => closeView()} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {hasCertificate() && <Grid container justify="center">
        <Paper className={classes.root} elevation={1}>
          <SnackbarContent
            className={classes.success}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <CheckCircleIcon className={classes.iconVariant} />
                {certificate.issuer}   {certificate.dateOfIssue}
              </span>
            }
          />
          <Typography variant="h5" component="h3">

          </Typography>
          <Typography component="p">

          </Typography>
          <Divider />
          <Document file={certificate.file}>
            <Page pageNumber={pageNumber} />
          </Document>
        </Paper>
      </Grid>}
    </Dialog>
  );
}

export default withStyles(styles)(View);