// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUniswapV2Router {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function WETH() external pure returns (address);
}

interface IMPETH {
    function stake() external payable;
    function unstake(uint256 amount) external;
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract RegenerativeStaking {
    address public immutable uniswapRouter;
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

    constructor(address _uniswapRouter, address _mpETH, address _donationWallet) {
        uniswapRouter = _uniswapRouter;
        mpETH = _mpETH;
        donationWallet = _donationWallet;
    }

    function donateAndStake() public payable {
        require(msg.value > 0, "Must send ETH to donate and stake");

        // Swap ETH to mpETH
        address[] memory path = new address[](2);
        path[0] = IUniswapV2Router(uniswapRouter).WETH();
        path[1] = mpETH;

        uint[] memory amounts = IUniswapV2Router(uniswapRouter).swapExactETHForTokens{value: msg.value}(
            0,
            path,
            address(this),
            block.timestamp + 600
        );

        uint256 mpEthAmount = amounts[amounts.length - 1];

        // Calculate donation amount and lock amount
        uint256 donationAmount = (mpEthAmount * DONATION_PERCENT) / 100;
        uint256 lockAmount = mpEthAmount - donationAmount;

        // Transfer donation amount to donation wallet
        IMPETH(mpETH).transfer(donationWallet, donationAmount);

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
        IMPETH(mpETH).transfer(msg.sender, stake.amount);
    }

    function claimInETH(uint256 stakeIndex) external {
        require(stakeIndex < stakes[msg.sender].length, "Invalid stake index");
        Stake storage stake = stakes[msg.sender][stakeIndex];
        require(block.timestamp >= stake.lockTime, "Stake is still locked");
        require(!stake.claimed, "Stake already claimed");

        stake.claimed = true;

        // Unstake and swap mpETH to ETH
        IMPETH(mpETH).unstake(stake.amount);

        address[] memory path = new address[](2);
        path[0] = mpETH;
        path[1] = IUniswapV2Router(uniswapRouter).WETH();

        IUniswapV2Router(uniswapRouter).swapExactETHForTokens(
            0,
            path,
            msg.sender,
            block.timestamp + 600
        );
    }

    receive() external payable {
        donateAndStake();
    }
}
