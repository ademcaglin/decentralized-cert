const path = require("path");

const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = { 
  contracts_build_directory: path.join(__dirname, "signer-app/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        console.log(process.env.MNEMONIC);
        return new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURAKEY}`)
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
