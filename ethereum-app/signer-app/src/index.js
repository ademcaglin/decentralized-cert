import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Drizzle, generateStore } from 'drizzle';
import * as drizzleReactHooks from './core/drizzle-hooks';
import CertificateStorage from "./contracts/CertificateStorage.json";
import App from "./App";

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

function Main() {
  return (
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      <drizzleReactHooks.Initializer
        error="There was an error."
        loadingContractsAndAccounts="Also still loading."
        loadingWeb3="Still loading.">
        <App />
      </drizzleReactHooks.Initializer>
    </drizzleReactHooks.DrizzleProvider >
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, rootElement);