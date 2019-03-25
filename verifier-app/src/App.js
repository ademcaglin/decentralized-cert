import React from "react";
import { useStore } from "./store/useStore";

import Scan from "./Scan";
import View from "./View";

const App = props => {
  const { state } = useStore();
  let page = <Scan />;
  if (state.currentPage === "view") {
    page = <View />;
  }
  return page;
};

export default App;
