import React, { Component, useState } from "react";
import { str2ab, getCertificateData, ab2str, bufferToHex } from '../utils/certificateHelper';
import { Button } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ipfsClient from 'ipfs-http-client';
const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState("sample.pdf");
    function toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }
    function handleFileChange(files) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(files[0]);
        fileReader.onload = function () {
           let buffer = fileReader.result;
           let x = getCertificateData(buffer).then(x =>{
            ipfs.add(toArrayBuffer(x.encrypted), (err, result) => {
                if (err) {
                    throw err
                }
                console.log(result);
            });
           });
        };
       
        setFile(files[0]);
    }
    return (<div>
        <Button variant="contained" component="label">
            Upload File
           <input type="file" style={{ display: "none" }} onChange={(e) => handleFileChange(e.target.files)} />
        </Button>
        <Document file={file}>
            <Page pageNumber={pageNumber} />
        </Document>
    </div>)
}