import React, { useState, useEffect, useContext } from "react";
import { base642ab, buffer2hex, hex2base58 } from "../utils/baseUtils";
import * as drizzleReactHooks from './drizzle-hooks';
import { getFromIpfs } from "../utils/ipfsUtils";

export default (selectedHash) => {
    const { drizzle } = drizzleReactHooks.useDrizzle();
    const [certificate, setCertificate] = useState({});
    useEffect(() => {
        async function setCer(hash) {
            if (hash) {
                let hash2 = buffer2hex(await crypto.subtle.digest("SHA-256", base642ab(hash)));
                let cer = await drizzle.contracts.CertificateStorage.methods.getCertificate(hash2).call();
                console.log(JSON.stringify(cer));
                let ipfs_hash = hex2base58(cer[1]);
                let dateOfIssue = new Date(cer[0] * 1000).toString();
                let issuer = cer[2];
                let file = await getFromIpfs(ipfs_hash, base642ab(hash));
                setCertificate({
                    file: file,
                    dateOfIssue: dateOfIssue,
                    issuer: issuer
                });
            }
        }
        setCer(selectedHash);
    }, [selectedHash]);
    return certificate;
    /*async function getCertificate(hash) {
        if (hash) {
            let hash2 = buffer2hex(await crypto.subtle.digest("SHA-256", base642ab(hash)));
            let cer = await drizzle.contracts.CertificateStorage.methods.getCertificate(hash2).call();
            console.log(JSON.stringify(cer));
            let ipfs_hash = hex2base58(cer[1]);
            let dateOfIssue = new Date(cer[0] * 1000).toString();
            let issuer = cer[2];
            let file = await getFromIpfs(ipfs_hash, base642ab(hash));
            return {
                file: file,
                dateOfIssue: dateOfIssue,
                issuer: issuer
            };
        }
    }

    return { getCertificate };*/
}