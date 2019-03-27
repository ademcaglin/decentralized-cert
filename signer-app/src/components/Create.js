import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "../store";
import useCreateCertificate from "../hooks/useCreateCertificate";
import { withRouter } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

const Create = props => {
  const { classes } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState();
  const { store, dispatch } = useContext(AppContext);
  const { addCertificate, certificateId } = useCreateCertificate();
  async function handleSave(){
    await addCertificate(file);
    
    props.history.push(`/`);
  }
  return (
    <Grid container justify="center">
      <Button variant="contained" component="label">
        Upload File
          <input
          type="file"
          style={{ display: "none" }}
          onChange={e => setFile(e.target.files[0])}
        />
      </Button>
      <Document file={file}>
        <Page pageNumber={pageNumber} />
      </Document>
      <Button color="inherit" onClick={handleSave}>
        Save
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(withRouter(Create));
