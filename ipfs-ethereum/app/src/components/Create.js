import React, { Component, useState } from "react";
import { ab2base64, base642ab, bufferToHex, readUploadedFileAsArrayBuffer, toArrayBuffer, getEncryptedArrayBuffer, getDecryptedArrayBuffer } from 'de-cert-lib/utils';
import { addToIpfs } from 'de-cert-lib/ipfsHelper';
import { Button } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import ipfsClient from 'ipfs-http-client';
import Dexie from 'dexie';

const db = new Dexie('DECERTDB');
db.version(1).stores({
    files: 'id'
});

const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState();
    
    async function handleFileChange(inputFiles) {
        setFile(inputFiles[0]);
        try {
           let buffer = await readUploadedFileAsArrayBuffer(inputFiles[0]);
           let file = await addToIpfs(ipfs, buffer);
           db.files.add(file);
        }
        catch(err) {
            console.log(err);
        }
    }

    async function handleSaveFile(inputFiles) {
        try {
           let buffer = await readUploadedFileAsArrayBuffer(inputFiles[0]);
           let file = await addToIpfs(ipfs, buffer);
           db.files.add(file);
        }
        catch(err) {
            
        }
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











/*import React, { Component, useState } from "react";
import { str2ab, getCertificateData, ab2str, bufferToHex, ab2base64, decryptFile } from '../utils/certificateHelper';
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
    
    const readUploadedFileAsArrayBuffer = inputFile => {
        const temporaryFileReader = new FileReader();
    
        return new Promise((resolve, reject) => {
          temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
          };
    
          temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
          };
          temporaryFileReader.readAsArrayBuffer(inputFile);
        });
      };

    async function handleFileChange(inputFiles) {
        let buffer = await readUploadedFileAsArrayBuffer(inputFiles[0]);
        console.log(buffer);
        let x = await getCertificateData(buffer);
        let content = ipfs.types.Buffer.from(x.encrypted);
        ipfs.add(content, (err, result) => {
            if (err) {
                throw err
            }
            //console.log(result);
            ipfs.get(result[0].hash, (err, files) =>{
                if (err) {
                    throw err
                }
                decryptFile(files[0].content, x.hash).then(dec=>console.log(dec)); 
            });
        });
        //console.log(ab2base64(x.encrypted));
        setFile(inputFiles[0]);
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
}*/