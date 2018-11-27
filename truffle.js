/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */


//var HDWalletProvider = require("truffle-hdwallet-provider")

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    // test: {
    //   host: '0.0.0.0',
    //   port: 8145,
    //   network_id: 333,
    //   gas: 4700000,
    //   gasPrice: 60 * 1000000000
    // },
    test: {
      host: 'localhost',
      port: 8545,
      network_id: 333,
      gas: 4700000,
      gasPrice: 60 * 1000000000
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: 1234,
      gas: 4700000,
      gasPrice: 60 * 1000000000
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.HDWALLET_MNEMONIC, process.env.REACT_APP_ROPSTEN_PROVIDER_URL),
      network_id: 3,
      gas: 4700000,
      gasPrice: 2 * 1000000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.HDWALLET_MNEMONIC, process.env.REACT_APP_RINKEBY_PROVIDER_URL),
      network_id: 4,
      gas: 4700000,
      gasPrice: 60 * 1000000000
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.HDWALLET_MNEMONIC_MAINNET, process.env.REACT_APP_MAINNET_PROVIDER_URL),
      network_id: 1,
      gas: 4700000,
      gasPrice: 2 * 1000000000
    },
    custom: {
      provider: () => new HDWalletProvider(process.env.HDWALLET_MNEMONIC_MAINNET, process.env.REACT_APP_CUSTOM_PROVIDER_URL),
      network_id: 1,
      gas: 4700000,
      gasPrice: 10 * 1000000000
    }
  },
  // mocha: {
  //   reporter: 'eth-gas-reporter',
  //   reporterOptions : {
  //     currency: 'CAD',
  //     gasPrice: 21
  //   }
  // }
};
