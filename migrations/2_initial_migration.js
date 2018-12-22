var Demo = artifacts.require("./demo.sol");

module.exports = function(deployer) {
  deployer.deploy(Demo);
};
