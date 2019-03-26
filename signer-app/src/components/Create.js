import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { buffer2hex, base582hex } from "../core/baseUtils";
import { addToIpfs } from "../core/ipfsUtils";
import readUploadedFileAsArrayBuffer from "../core/fileUtils";
import { Button } from "@material-ui/core";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Dexie from "dexie";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { ListContext } from "./ListContext";

const db = new Dexie("DECERTDB");
db.version(1).stores({
  files: "id"
});

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;
const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Create = props => {
  const { classes } = props;
  const context = useContext(ListContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState();

  function handleClose() {
    context.setState({ openCreate: false });
  }

  async function handleFileChange(inputFiles) {
    setFile(inputFiles[0]);
  }

  async function handleSaveFile() {
    try {
      let buffer = await readUploadedFileAsArrayBuffer(file);
      let result = await addToIpfs(buffer);
      let hash2 = buffer2hex(
        await crypto.subtle.digest("SHA-256", result.hash)
      );
      let ipfs_hash = base582hex(result.ipfs_hash);
      let created_at = Math.floor(Date.now() / 1000);
      /*await drizzle.contracts.CertificateStorage.methods
        .createCertificate(hash2, ipfs_hash, created_at)
        .send(drizzleState.accounts[0]);*/
      db.files.add({ id: result.hash, created_at: created_at });
      context.setState({ openCreate: false });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Dialog
      fullScreen
      open={context.openCreate}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex} />
          <Button
            color="inherit"
            onClick={() => {
              handleSaveFile();
            }}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={e => handleFileChange(e.target.files)}
          />
        </Button>
        <Document file={file}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Grid>
    </Dialog>
  );
};

export default withStyles(styles)(Create);

/*import React, { Component, useState } from "react";
import { str2ab, getCertificateData, ab2str, bufferToHex, ab2base64, decryptFile } from '../utils/certificateHelper';
import { Button } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ipfsClient from 'ipfs-http-client';
const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState("sample.pdf");

    function toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }

    const readUploadedFileAsArrayBuffer = inputFile => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
          temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
          };

          temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
          };
          temporaryFileReader.readAsArrayBuffer(inputFile);
        });
      };

    async function handleFileChange(inputFiles) {
        let buffer = await readUploadedFileAsArrayBuffer(inputFiles[0]);
        console.log(buffer);
        let x = await getCertificateData(buffer);
        let content = ipfs.types.Buffer.from(x.encrypted);
        ipfs.add(content, (err, result) => {
            if (err) {
                throw err
            }
            //console.log(result);
            ipfs.get(result[0].hash, (err, files) =>{
                if (err) {
                    throw err
                }
                decryptFile(files[0].content, x.hash).then(dec=>console.log(dec));
            });
        });
        //console.log(ab2base64(x.encrypted));
        setFile(inputFiles[0]);
    }

    return (<div>
        <Button variant="contained" component="label">
            Upload File
           <input type="file" style={{ display: "none" }} onChange={(e) => handleFileChange(e.target.files)} />
        </Button>
        <Document file={file}>
            <Page pageNumber={pageNumber} />
        </Document>
    </div>)
}*/
