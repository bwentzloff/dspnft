/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
const path = require("path");
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, 'accounts.env')
} );

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/4ddec5f8959f430d9a62bb42b63736d3",
      accounts: [dotenv.parsed.PRIVATE_KEY]
    }
  },
  solidity: "0.8.9",
};
