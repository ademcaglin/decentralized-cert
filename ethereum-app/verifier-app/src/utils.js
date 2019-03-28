import abi from "./abi.json";
const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/43bddbfe23ce4b5180839170c00aeb48"
);
/*const address = "0x6e425be02ce0c02e170fc9dabd7c451a60a29f90";
web3.eth.getBalance(address, (err, wei) => {
  let balance = web3.utils.fromWei(wei, "ether");
  console.log(balance);
});*/
const address = "0x8d29f027298d2cd13d477ed745516033e50aa204";
const contract = new web3.eth.Contract(abi, address);
let key = web3.utils.keccak256("Decentralized Issuer");
contract.methods
  .issuers(key)
  .call()
  .then(x => console.log(x));
