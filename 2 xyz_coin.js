// SPDX-License-Identifier: MIT
const XYZCoin = artifacts.require("XYZCoin");

module.exports = function (deployer) {
  // Deploy the XYZCoin contract to the blockchain
  deployer.deploy(XYZCoin);
};
