// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMPETH {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract RegenerativeStaking {
    address public immutable mpETH;
    address public immutable donationWallet;

    struct Stake {
        uint256 amount;
        uint256 lockTime;
        bool claimed;
    }

    mapping(address => Stake[]) public stakes;

    uint256 public constant LOCK_PERIOD = 365 days;
    uint256 public constant DONATION_PERCENT = 4;

    constructor(address _mpETH, address _donationWallet) {
        mpETH = _mpETH;
        donationWallet = _donationWallet;
    }

    function donateAndStake(uint256 amount) public {
        require(amount > 0, "Must send mpETH to donate and stake");

        // Transfer mpETH from the user to the contract
        require(IMPETH(mpETH).transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Calculate donation amount and lock amount
        uint256 donationAmount = (amount * DONATION_PERCENT) / 100;
        uint256 lockAmount = amount - donationAmount;

        // Transfer donation amount to donation wallet
        require(IMPETH(mpETH).transfer(donationWallet, donationAmount), "Transfer failed");

        // Record the staker's locked amount and lock time
        stakes[msg.sender].push(Stake({
            amount: lockAmount,
            lockTime: block.timestamp + LOCK_PERIOD,
            claimed: false
        }));
    }

    function claim(uint256 stakeIndex) external {
        require(stakeIndex < stakes[msg.sender].length, "Invalid stake index");
        Stake storage stake = stakes[msg.sender][stakeIndex];
        require(block.timestamp >= stake.lockTime, "Stake is still locked");
        require(!stake.claimed, "Stake already claimed");

        stake.claimed = true;

        // Transfer the locked amount back to the user
        require(IMPETH(mpETH).transfer(msg.sender, stake.amount), "Transfer failed");
    }

    function getStakes(address user) external view returns (Stake[] memory) {
        return stakes[user];
    }
}
