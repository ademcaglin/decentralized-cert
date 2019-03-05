import React, { Component } from "react";
import List from './components/List';
import Create from './components/Create';
import Verify from './components/Verify';
import Layout from './components/Layout';
import { Route, Switch } from 'react-router-dom';
/*import {Drizzle, generateStore} from 'drizzle';
import { drizzleReactHooks  } from "drizzle-react";
import CertificateStorage from "./contracts/CertificateStorage.json";
const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [CertificateStorage],
  polls: {
    accounts: 1500,
  },
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
<drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <drizzleReactHooks.Initializer
      error="There was an error."
      loadingContractsAndAccounts="Also still loading."
loadingWeb3="Still loading.">
</drizzleReactHooks.Initializer>
    </drizzleReactHooks.DrizzleProvider>
*/
export default () => (
      <Layout>
        <Switch>
          <Route exact path='/' component={List} />
          <Route path='/create' component={Create} />
          <Route path='/verify' component={Verify} />
        </Switch>
      </Layout>
)
