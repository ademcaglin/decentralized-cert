import React, {
  Component,
  useState,
  useEffect,
  useReducer,
  useMemo
} from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Dexie from "dexie";
import { ListContext } from "./ListContext";
import View from "./View";
import Create from "./Create";
import { getFromIpfs } from "../core/ipfsUtils";
import { buffer2hex, hex2base58, ab2base64 } from "../core/baseUtils";
import QRCode from "qrcode.react";
import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient("ipfs.infura.io", "5001", {
  protocol: "https"
});

const db = new Dexie("DECERTDB");
db.version(1).stores({
  files: "id"
});

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

function List(props) {
  const { classes } = props;
  const [rows, setRows] = useState([]);

  const [state, setState] = useReducer(
    (state, newState) => {
      return { ...state, ...newState };
    },
    {
      openView: false,
      viewFile: [],
      openCreate: false
    }
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      setState
    }),
    [state.openView, state.viewFile, state.openCreate]
  );

  useEffect(() => {
    (async function() {
      let all = await db.files.toArray();
      if (all.length) {
        setRows(all);
      }
    })();
  }, []);

  async function handleView(hash) {
    setState({ openView: true });
    let hash2 = buffer2hex(await crypto.subtle.digest("SHA-256", hash));
    /*let cer = await drizzle.contracts.CertificateStorage.methods
      .getCertificate(hash2)
      .call();*/
    /*let ipfs_hash = hex2base58(cer[2]);
    let file = await getFromIpfs(ipfs, ipfs_hash, hash);
    setState({ viewFile: file });*/
  }

  async function handleCreate() {
    setState({ openCreate: true });
  }

  return (
    <ListContext.Provider value={contextValue}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>FILE HASH</TableCell>
              <TableCell align="left">DATE OF CREATION</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              let rowId = ab2base64(row.id);
              return (
                <TableRow key={rowId}>
                  <TableCell component="th" scope="row">
                    <QRCode value={rowId} />
                  </TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                  <TableCell align="right">
                    <Button color="inherit" onClick={() => handleView(row.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <IconButton color="inherit" onClick={handleCreate} aria-label="Create">
        <Icon className={classes.icon}>add</Icon>
      </IconButton>
      <View />
      <Create />
    </ListContext.Provider>
  );
}

export default withStyles(styles)(List);
