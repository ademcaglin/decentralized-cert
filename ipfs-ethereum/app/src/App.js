import React, { Component } from "react";
import List from './components/List';
import Create from './components/Create';
import Layout from './components/Layout';
import { Route, Switch } from 'react-router-dom';
import { Drizzle, generateStore } from 'drizzle';
import * as drizzleReactHooks  from './drizzle-hooks'
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

export default () => (
  <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <Layout>
      <Switch>
        <Route exact path='/' component={List} />
        <Route path='/create' component={Create} />
      </Switch>
    </Layout>
  </drizzleReactHooks.DrizzleProvider>
)
