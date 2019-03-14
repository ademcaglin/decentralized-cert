import React, { Component, useState, useEffect,useReducer,useMemo } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dexie from 'dexie';
import { ab2base64 } from 'de-cert-lib/utils';
import { ListContext } from './ListContext';
import View from './View';
import { getFromIpfs } from 'de-cert-lib/ipfsHelper';
import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });

const db = new Dexie('DECERTDB');
db.version(1).stores({
    files: 'id'
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function List(props) {
  const { classes } = props;
  const [rows, setRows] = useState([]);

  const [state, setState] = useReducer(
    (state, newState) => {
      return { ...state, ...newState };
    },
    { open: false, file: [] }
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      setState
    }),
    [state.open, state.file]
  );
  
  useEffect(() => {
    (async function() {
      let all = await db.files.toArray();
      if(all.length){
        setRows(all);
      }
    })();
  },[]);
  
  async function handleCreateOpen(hash, ipfs_hash){
     setState({open: true});
     let  file = await getFromIpfs(ipfs, ipfs_hash, hash);
     setState({file: file});   
  }
  
  return (
    <ListContext.Provider value={contextValue}>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>FILE HASH</TableCell>
            <TableCell align="left">IPFS HASH</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row =>{ 
             let rowId = ab2base64(row.id);
            return (<TableRow key={row.rowId}>
              <TableCell component="th" scope="row">
                {rowId}
              </TableCell>
              <TableCell align="left">{row.ipfs_hash}</TableCell>
              <TableCell align="right">
                <Button color="inherit"  onClick={()=>handleCreateOpen(row.id, row.ipfs_hash)}>View</Button> 
              </TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </Paper>
    <Button variant="outlined" color="primary">
          Save to IPFS
    </Button>
    <View/>
    </ListContext.Provider>
  );
}

export default withStyles(styles)(List);