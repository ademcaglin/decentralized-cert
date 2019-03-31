import React, { useReducer, useEffect, useState } from "react";
import List from "./components/List";
import Create from "./components/Create";
import Layout from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import { reducer, initialState, AppContext } from "./store";
import * as drizzleReactHooks from './core/drizzle-hooks';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
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
});
function App(props) {
    const { classes } = props;
    const [isValidSigner, setIsValidSigner] = useState(false);
    const [store, dispatch] = useReducer(reducer, initialState);
    const { drizzle } = drizzleReactHooks.useDrizzle();
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        accounts: drizzleState.accounts
    }));
    useEffect(() => {
        async function Check() {
            let ac = drizzleState.accounts[0];
            let isValidSigner = await drizzle.contracts.CertificateStorage.methods.isValidSigner(ac).call();
            setIsValidSigner(isValidSigner);
        }
        Check();
    }, []);
    return (
        isValidSigner ?
            <AppContext.Provider value={{ store, dispatch }}>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={List} />
                        <Route path="/create" component={Create} />
                    </Switch>
                </Layout>
            </AppContext.Provider> :
            <React.Fragment>
                <SnackbarContent
                    className={classes.error}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <ErrorIcon className={classes.iconVariant} />
                            Current account is not valid signer
                        </span>
                    }
                />
            </React.Fragment>
    );
}

export default withStyles(styles)(App);