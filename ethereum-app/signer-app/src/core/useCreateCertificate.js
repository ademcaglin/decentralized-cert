import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../store";
import { addToIpfs } from "../utils/ipfsUtils";
import readUploadedFileAsArrayBuffer from "../utils/fileUtils";
import { ab2base64, base582hex } from "../utils/baseUtils";
import * as drizzleReactHooks from './drizzle-hooks';
import { buffer2hex } from "../utils/baseUtils";

export default () => {
    const { store, dispatch } = useContext(AppContext);
    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        accounts: drizzleState.accounts,
        contracts: drizzleState.contracts
    }));
    const { drizzle } = drizzleReactHooks.useDrizzle();
    async function addCertificate(file) {
        let arrayBuffer = await readUploadedFileAsArrayBuffer(file);
        let hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
        let hash2 = await crypto.subtle.digest("SHA-256", hash);
        let ipfs_hash = await addToIpfs(arrayBuffer);
        let created_at = Math.floor(Date.now() / 1000);
        await drizzle.contracts.CertificateStorage.methods
            .createCertificate(buffer2hex(hash2), base582hex(ipfs_hash), created_at)
            .send(drizzleState.accounts[0]);
        dispatch({
            type: "ADD_CERTIFICATE",
            id: ab2base64(hash2),
            createdAt: Date.now().toString(),
            hash: ab2base64(hash)
        });
    }

    return { addCertificate };
}