import React, { useContext, useState } from "react";
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
import QRCode from "qrcode.react";
import { AppContext } from "../store";
import View from "./View";
import useGetCertificate from "../core/useGetCertificate";

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
  const { store, dispatch } = useContext(AppContext);
  const [selectedHash, setSelectedHash] = useState();
  async function openView(hash){
    setSelectedHash(hash);
  }

  function closeView(){
    setSelectedHash('');
  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">DATE OF CREATION</TableCell>
              <TableCell>FILE HASH</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {store.certificates.map(cer => {
              return (
                <TableRow key={cer.id}>
                  <TableCell component="th" scope="row">
                    <QRCode value={cer.hash} />
                  </TableCell>
                  <TableCell align="left">{cer.createdAt}</TableCell>
                  <TableCell align="right">
                    <Button color="inherit" onClick={() => openView(cer.hash)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <IconButton color="inherit" onClick={() => console.log("xcx")} aria-label="Create">
        <Icon className={classes.icon}>add</Icon>
      </IconButton>
      <View selectedHash={selectedHash} closeView={closeView} />
    </React.Fragment>
  );
}

export default withStyles(styles)(List);
