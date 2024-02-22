// SPDX-License-Identifier: MIT
const XYZCoin = artifacts.require("XYZCoin");
const truffleAssert = require ( ' truffle-assertions ' ) ; 

contract("XYZCoin", async accounts => {
  // The first account is the creator of the contract
  let creator = accounts[0];
  // The second and third accounts are used for testing
  let alice = accounts[1];
  let bob = accounts[2];

  // A variable to store the deployed contract instance
  let xyzCoinInstance;

  // Before each test, deploy a new contract instance
  beforeEach(async () => {
    xyzCoinInstance = await XYZCoin.new();
  });

  // Test that the token name is set correctly
  it("should set the token name correctly", async () => {
    assert.equal(await xyzCoinInstance.name(), "XYZCoin");
  });

  // Test that the initial token balance of the creator is equal to the total supply
  it("should assign the initial balance to the creator", async () => {
    let balance = await xyzCoinInstance.balanceOf(creator);
    let totalSupply = await xyzCoinInstance.totalSupply();
    assert.equal(balance.toString(), totalSupply.toString());
  });

  // Test that tokens can be transferred using the transfer() function
  it("should transfer tokens correctly", async () => {
    // Transfer 100 tokens from the creator to Alice
    await xyzCoinInstance.transfer(alice, 100, {from: creator});
    // Check the balances after the transfer
    let balanceCreator = await xyzCoinInstance.balanceOf(creator);
    let balanceAlice = await xyzCoinInstance.balanceOf(alice);
    assert.equal(balanceCreator, 900);
    assert.equal(balanceAlice, 100);
  });

  // Test that the allowance can be set and read
  it("should set and get the allowance correctly", async () => {
    // Allow Alice to spend 50 tokens on behalf of the creator
    await xyzCoinInstance.approve(alice, 50, {from: creator});
    // Check the allowance after the approval
    let allowance = await xyzCoinInstance.allowance(creator, alice);
    assert.equal(allowance, 50);
  });

  // Test that accounts can transfer tokens on behalf of other accounts
  it("should transfer tokens on behalf of other accounts correctly", async () => {
    // Allow Alice to spend 50 tokens on behalf of the creator
    await xyzCoinInstance.approve(alice, 50, {from: creator});
    // Transfer 40 tokens from the creator to Bob, using Alice's allowance
    await xyzCoinInstance.transferFrom(creator, bob, 40, {from: alice});
    // Check the balances and the allowance after the transfer
    let balanceCreator = await xyzCoinInstance.balanceOf(creator);
    let balanceAlice = await xyzCoinInstance.balanceOf(alice);
    let balanceBob = await xyzCoinInstance.balanceOf(bob);
    let allowance = await xyzCoinInstance.allowance(creator, alice);
    assert.equal(balanceCreator, 960);
    assert.equal(balanceAlice, 0);
    assert.equal(balanceBob, 40);
    assert.equal(allowance, 10);
  });
  it("should throw an error when trying to transfer tokens with insufficient balance", async () => {
    // Get an instance of the deployed contract
    const xyzCoinInstance = await XYZCoin.deployed();
    // Try to transfer 1000 tokens from the second account to the first account
    // This should fail because the second account only has 0 tokens
    await truffleAssert.reverts(
      xyzCoinInstance.transfer(accounts[0], 1000, {from: accounts[1]}),
      "Insufficient balance" // This is the error message expected from the contract
    );
  });
  
});
