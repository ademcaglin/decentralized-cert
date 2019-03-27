import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "../store";
import useCreateCertificate from "../core/useCreateCertificate";
import { withRouter } from 'react-router-dom';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  flex: {
    flex: 1
  }
});

const Create = props => {
  const { classes } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState();
  const { store, dispatch } = useContext(AppContext);
  const { addCertificate } = useCreateCertificate();
  async function handleSave() {
    await addCertificate(file);
    props.history.push(`/`);
  }
  return (
    <React.Fragment>
      <Grid container justify="center">
        {file ?
          <React.Fragment>
            <Button variant="contained" size="small" className={classes.button} onClick={handleSave}>
              <SaveIcon className={classes.leftIcon} />
              Save Certificate
            </Button>
            <Button variant="outlined" color="secondary" onClick={()=>setFile(null)} className={classes.button}>
              Cancel
             </Button>
          </React.Fragment>
          :
          <Button variant="contained" component="label">
            Upload File
          <input
              type="file"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            />
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        }


      </Grid>
      <Grid container justify="center">
        <Document file={file}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(Create));
