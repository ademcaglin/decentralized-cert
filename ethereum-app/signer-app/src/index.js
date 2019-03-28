import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import List from "./components/List";
import Create from "./components/Create";
import Layout from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import { reducer, initialState, AppContext } from "./store";
import { Drizzle, generateStore } from 'drizzle';
import * as drizzleReactHooks from './core/drizzle-hooks';
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

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      <drizzleReactHooks.Initializer
        error="There was an error."
        loadingContractsAndAccounts="Also still loading."
        loadingWeb3="Still loading.">
        <AppContext.Provider value={{ store, dispatch }}>
          <Layout>
            <Switch>
              <Route exact path="/" component={List} />
              <Route path="/create" component={Create} />
            </Switch>
          </Layout>
        </AppContext.Provider>
      </drizzleReactHooks.Initializer>
    </drizzleReactHooks.DrizzleProvider >
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, rootElement);