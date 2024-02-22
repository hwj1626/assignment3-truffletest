// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// ERC20.sol
// Interface for the ERC20 standard
// https://eips.ethereum.org/EIPS/eip-20
interface ERC20 {
    // Returns the total token supply
    function totalSupply() external view returns (uint256);

    // Returns the balance of the account with the given address
    function balanceOf(address account) external view returns (uint256);

    // Transfers the specified amount of tokens to the recipient and returns a boolean value indicating whether the operation succeeded
    function transfer(address recipient, uint256 amount) external returns (bool);

    // Returns the remaining number of tokens that the spender is allowed to spend on behalf of the owner
    function allowance(address owner, address spender) external view returns (uint256);

    // Sets the allowance of the spender over the owner's tokens and returns a boolean value indicating whether the operation succeeded
    function approve(address spender, uint256 amount) external returns (bool);

    // Transfers the specified amount of tokens from the sender to the recipient, using the allowance mechanism, and returns a boolean value indicating whether the operation succeeded
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    // Emitted when tokens are transferred, including zero value transfers
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Emitted when an allowance is set by a token owner for a spender
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
