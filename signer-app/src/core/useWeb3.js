import React, { useContext, useEffect } from "react";
import { AppContext } from "../store";
import getWeb3 from "./getWeb3";
import abi from "./abi.json";

export default () => {
    //const { store, dispatch } = useContext(AppContext);
    /*useEffect(()=>{
       setWeb3();
    });*/
    async function setWeb3() {
        let web3 = await getWeb3();
        const address = "0x8d29f027298d2cd13d477ed745516033e50aa204";
        const contract = new web3.eth.Contract(abi, address);
        let key = web3.utils.keccak256("Decentralized Issuer");
        contract.methods
            .issuers(key)
            .call()
            .then(x => console.log(x));
        /*dispatch({
            type: "SET_WEB3",
            web3: web3,
            contract: contract,
            account: address
        });*/
    }

    return {setWeb3};
}