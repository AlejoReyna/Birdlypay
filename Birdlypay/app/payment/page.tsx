"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import { QRCodeSVG } from 'qrcode.react';
import Dropdown from "@/components/Dropdown"
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';

import { createThirdwebClient, getContract, resolveMethod, ThirdwebContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ConnectButton, ThirdwebProvider, TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, } from "thirdweb/react";
import { v4 as uuidv4 } from "uuid";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export const contract = getContract({
  client,
  chain: defineChain(84532),
  address: "0xDa69fDb6F12031620ec53120B6CB47D703647792"
});

export default function Payment() {
  const router = useRouter();
  const [paymentTitle, setPaymentTitle] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [address, setAddress] = useState("");
  const [paymentGuid, setPaymentGuid] = useState(uuidv4());
  // const newGuid: string = uuidv4();

  const handleHome = () => {
    router.push('/home');
  }
  const [showQR, setShowQR] = useState(false);
  const [isLinkCreated, setIsLinkCreated] = useState(false);

  const transaction = prepareContractCall({
    contract,
    method: "function createPaymentLink(uint256 amount, string title, string guid, string description)",
    params: [BigInt(amount), paymentTitle, paymentGuid, paymentDescription],

  });

  const readWalletInfo = async (data: any) => {
    console.log("Wallet connected: ", data);
    const account = data.getAccount();
    console.log("Address: ", account?.address);
    setAddress(account?.address);
  }


  const handleSuccess = (receipt: any) => {
    console.log("Payment link created successfully. receipt: ", receipt);
    const link = `${window.location.origin}/receiverPage?guid=${paymentGuid}`;
    // Set the payment link in the state
    setPaymentLink(link);
    setIsLinkCreated(true); // Updates the status to hide the inputs 
  }

  const handleShare = async () => {
    setShowQR(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Link',
          text: 'Here\'s your payment link',
          url: paymentLink,
        });
        console.log('Successful share');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Here's your payment link: ${paymentLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(paymentLink)}&text=${encodeURIComponent("Here's your payment link")}`;
      const discordUrl = `https://discord.com/channels/@me?message=${encodeURIComponent(shareText)}`;
  
      const option = window.prompt(
        "Choose an option to share:\n1. WhatsApp\n2. Telegram \n3. Discord"
      );
  
      switch (option) {
        case "1":
          window.open(whatsappUrl, '_blank');
          break;
        case "2":
          window.open(telegramUrl, '_blank');
          break;
        case "3":
          window.open(discordUrl, '_blank');
          break;
        default:
          alert("Invalid option or sharing cancelled");
      }
    }
  };
  
  const handleEmailShare = () => {
    setShowQR(false);
    const subject = encodeURIComponent("Payment Link");
    const body = encodeURIComponent(`Here's your payment link: ${paymentLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  
  const handleCopy = async () => {
    setShowQR(false);
    if (paymentLink) {
      try {
        await navigator.clipboard.writeText(paymentLink);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert("Failed to copy link. Please try again.");
      }
    }
  };

  return (
    <div className='flex flex-col bg-dark h-max min-h-screen'>
  {/* First row */}
  <div className='flex flex-col'>
    <div className="w-full flex justify-between p-4">
      <div className='btn-container justify-start m-4'>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
          onClick={handleHome}> Back </button>
      </div>
      <div className='justify-end m-4'>
        <ConnectButton client={client} onConnect={readWalletInfo} />
      </div>
    </div>
    <div className="w-1/2 ml-4">
      <h6 className='text-white text-3xl'> PayLink </h6>
    </div>
  </div>
  
  {!isLinkCreated ? (
    <>
      <p className='text-white ml-8 mt-8'> Payment title </p>
      <div className="flex justify-center mx-8 mt-4 p-1 bg-white rounded-xl">
        <input
          style={{ width: '100%', outline: 'none' }}
          value={paymentTitle}
          onChange={(e) => setPaymentTitle(e.target.value)}
          placeholder="Enter payment title"
          className='p-2'
        />
      </div>
      <div className="flex justify-between items-center mx-8 mt-4 py-2 px-4 bg-white rounded-xl">
        <div className="flex justify-between items-center ">
          <Image src={"/eth.png"} alt="Birdlypay"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '25px', margin: '5px' }}
          />
          <h6 className='font-bold'> ETH </h6>
        </div>
      </div>
      <p className='text-white ml-8 mt-8'> Amount </p>
      <div className="flex justify-between items-center mx-8 mt-4 px-4 py-1 bg-white rounded-xl">
        <div className="flex items-center">
          <p className="mr-2"> $ </p>
          <input
            style={{ width: '80%', outline: 'none' }}
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='p-2'
          />
        </div>
        <p> USD </p>
      </div>
      <div className="flex justify-center mx-8 mt-4 p-1 bg-white rounded-xl">
        <input
          style={{ width: '100%', outline: 'none' }}
          value={paymentDescription}
          onChange={(e) => setPaymentDescription(e.target.value)}
          placeholder="Payment description"
          className='p-2'
        />
      </div>
      <div className="flex justify-center mt-8 mb-20">
        <TransactionButton
          transaction={() => transaction}
          onTransactionConfirmed={handleSuccess}
          unstyled
          className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Create
        </TransactionButton>
      </div>
    </>
  ) : (
    <div className="mx-8 mt-4">
      <div className="p-4 bg-white rounded-xl">
        <p>Your payment link:</p>
        <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
          {paymentLink}
        </a>
      </div>
      
      <p className='text-white mt-8'> Share your paylink via: </p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div
          className="flex py-2 px-4 bg-white rounded-xl cursor-pointer"
          onClick={() => setShowQR(!showQR)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
          </svg>
          <p className="ml-2 font-bold">
            QR Code
          </p>
        </div>
        <div className="flex py-2 px-4 bg-white rounded-xl cursor-pointer"
          onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          <p className="ml-2 font-bold">
            Copy
          </p>
        </div>
        <div
          className="flex items-center py-2 px-4 bg-white rounded-xl cursor-pointer"
          onClick={handleShare}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
          </svg>
          <p className="ml-2 font-bold">
            Share
          </p>
        </div>
        <div
          className="flex items-center py-2 px-4 bg-white rounded-xl cursor-pointer"
          onClick={handleEmailShare}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <p className="ml-2 font-bold">
            Email
          </p>
        </div>
      </div>

      {showQR && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG value={paymentLink} size={200} />
          </div>
        </div>
      )}
    </div>
  )}
</div>


  );
} 
