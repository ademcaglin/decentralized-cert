import React, { useState, useEffect } from "react";
import List from "./components/List";
import Create from "./components/Create";
import Layout from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import getWeb3 from "./core/getWeb3";


export default () => {
  async function getWeb3Func() {
    try {
      let web3 = await getWeb3();
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWeb3Func();
  });

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/create" component={Create} />
      </Switch>
    </Layout>
  );
};
