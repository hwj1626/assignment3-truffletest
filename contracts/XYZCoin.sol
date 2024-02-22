// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./ERC20.sol";

contract XYZCoin is ERC20 {
    // The name of the token
    string public constant name = "XYZCoin";
    // The symbol of the token
    string public constant symbol = "XYZ";
    // The number of decimals the token uses
    uint8 public constant decimals = 0;
    // The total supply of the token
    uint256 public constant override totalSupply = 1000;


    // A mapping that stores the balance of each account
    mapping (address => uint256) public balances;
    // A mapping that stores the allowance of each account to spend another account's tokens
    mapping (address => mapping (address => uint256)) public allowed;

    // The constructor that assigns the initial supply to the creator of the contract
    constructor() public{
        balances[msg.sender] = totalSupply;
    }

    // The function that returns the balance of a given account
    function balanceOf(address _owner) public view override returns (uint256) {
        return balances[_owner];
    }

    // The function that transfers tokens from the caller to another account
    function transfer(address _to, uint256 _value) public override returns (bool) {
        require(_value <= balances[msg.sender], "Insufficient balance");
        require(_to != address(0), "Invalid address");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // The function that allows another account to spend the caller's tokens
    function approve(address _spender, uint256 _value) public override returns (bool) {
        require(_spender != address(0), "Invalid address");
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // The function that returns the allowance of an account to spend another account's tokens
    function allowance(address _owner, address _spender) public view override returns (uint256) {
        return allowed[_owner][_spender];
    }

    // The function that transfers tokens from one account to another, using the allowance mechanism
    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool) {
        require(_value <= balances[_from], "Insufficient balance");
        require(_value <= allowed[_from][msg.sender], "Insufficient allowance");
        require(_to != address(0), "Invalid address");
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
