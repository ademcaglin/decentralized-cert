import React, { useCallback, useEffect } from "react";
import QrReader from "react-qr-reader";
import { useStore } from "./store/useStore";
import "./utils";

const Scan = () => {
  const { dispatch } = useStore();
  const view = useCallback(() => dispatch({ type: "view" }), [dispatch]);

  useEffect(() => {});
  async function handleScan(data) {
    if (data) {
      view();
    }
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default Scan;
