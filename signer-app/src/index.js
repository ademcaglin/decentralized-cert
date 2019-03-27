import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import List from "./components/List";
import Create from "./components/Create";
import Layout from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import getWeb3 from "./core/getWeb3";
import { reducer, initialState, AppContext } from "./store";

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getWeb3();
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/create" component={Create} />
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, rootElement);