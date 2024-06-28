//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentLink is Ownable {
    struct Payment {
        uint256 amount;
        string title;
        string guid;
        address creator;
    }

    event PaymentLinkCreated(
        address indexed creator,
        uint256 amount,
        string title,
        string guid
    );

    event PaymentMade(
        address indexed payer,
        address indexed recipient,
        uint256 amount,
        uint256 fee
    );

    mapping(string => Payment) public payments;

    uint256 public feePercentage = 5;

    function createPaymentLink(uint256 amount, string memory title, string memory guid) public {
        require(bytes(payments[guid].guid).length == 0, "GUID already exists");

        payments[guid] = Payment({
            amount: amount,
            title: title,
            guid: guid,
            creator: msg.sender
        });

        emit PaymentLinkCreated(msg.sender, amount, title, guid);
    }

    function makePayment(string memory guid) public payable {
        Payment memory payment = payments[guid];
        require(bytes(payment.guid).length != 0, "Payment not found");
        require(msg.value == payment.amount, "Incorrect payment amount");

        uint256 fee = (msg.value * feePercentage) / 100;
        uint256 amountToRecipient = msg.value - fee;

        payable(payment.creator).transfer(amountToRecipient);

        emit PaymentMade(msg.sender, payment.creator, amountToRecipient, fee);
    }

    function setFeePercentage(uint256 newFeePercentage) public onlyOwner {
        require(newFeePercentage <= 100, "Fee percentage cannot be more than 100");
        feePercentage = newFeePercentage;
    }

    function getPaymentDetails(string memory guid) public view returns (uint256, string memory, address) {
        Payment memory payment = payments[guid];
        require(bytes(payment.guid).length != 0, "Payment not found");

        return (payment.amount, payment.title, payment.creator);
    }
}