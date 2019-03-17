import React, { useState } from 'react';
import './App.css';
import QrReader from "react-qr-reader";

export default () => {
  const [delay, setDelay] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();
  function handleScan(hash){
    // loading
    if (hash) {
       // get arraybuffer
       // get hash2
       // get certificate
       // get encrypted file
       // decrypt file
       // set file, signer, issuer
    }
  }
  <div>
    <QrReader
      delay={delay}
      onError={(err) => setError(err)}
      onScan={handleScan}
      style={{ width: "100%" }}
    />
    <p>{result}</p>
  </div>
}
