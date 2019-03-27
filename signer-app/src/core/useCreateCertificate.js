import React, { useContext } from "react";
import { AppContext } from "../store";
import { addToIpfs } from "./ipfsUtils";
import readUploadedFileAsArrayBuffer from "../utils/fileUtils";
import {ab2base64} from "../utils/baseUtils";

export default () => {
    const { store, dispatch } = useContext(AppContext);

    async function addCertificate(file) {
        let arrayBuffer = await readUploadedFileAsArrayBuffer(file);
        let hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
        let hash2 = await crypto.subtle.digest("SHA-256", hash);
        let ipfs_hash = await addToIpfs(arrayBuffer);
        console.log(ipfs_hash);
        dispatch({
            type: "ADD_CERTIFICATE",
            id: ab2base64(hash2),
            createdAt: Date.now().toString()
        });
    }

    return {addCertificate};
}