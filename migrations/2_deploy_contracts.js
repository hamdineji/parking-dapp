const Parking = artifacts.require("Parking");

module.exports = function(deployer) {
  deployer.deploy(Parking);
};