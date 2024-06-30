"use client"

import { useState } from 'react';
import Image from "next/image";
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
  address: "0xf3F7F05406d9F2B4EcB43Cc240bd6657bB6A8f7f"
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

  // const handleCreateLink = async () => {
  //   if (!window.ethereum) {
  //     alert("Please install MetaMask!");
  //     return;
  //   }

  //   try {
  //     // Request account access
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const address = await signer.getAddress();

  //     // Create a unique identifier for this payment
  //     const paymentId = ethers.utils.id(Date.now().toString() + address);

  //     // Create the payment link
  //     //const link = `${window.location.origin}/paymentPage?title=${encodeURIComponent(paymentTitle)}&amount=${amount}&address=${address}`;
  //     const link = `${window.location.origin}/paymentPage?guid=${paymentGuid}`;

  //     setPaymentLink(link);
  //   } catch (error) {
  //     console.error("Error creating payment link:", error);
  //     alert("Error creating payment link. Please try again.");
  //   }
  // }

  const handleSuccess = (receipt: any) => {
    console.log("Payment link created successfully. receipt: ", receipt);

    //const link = `${window.location.origin}/receiverPage?title=${encodeURIComponent(paymentTitle)}&amount=${amount}&address=${address}`;
    const link = `${window.location.origin}/receiverPage?guid=${paymentGuid}`;
    // Set the payment link in the state
    setPaymentLink(link);
    // Navigate to the paymentLink page with the generated link
    //router.push(link);
  }

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
      <p className='text-white ml-8 mt-8'> Payment title </p>

      {/** Here must go the payment title */}
      <div className="flex justify-center mx-8 mt-4 p-1 bg-white rounded-xl">
        <input
          style={{ width: '100%', outline: 'none' }}
          value={paymentTitle}
          onChange={(e) => setPaymentTitle(e.target.value)}
          placeholder="Enter payment title"
          className='p-2'
        />
      </div>
      {/** End of payment title input */}

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
        {/* <Dropdown /> */}
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
        {/* <button className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
          onClick={handleCreateLink}>
          Create
        </button> */}

        <TransactionButton
          transaction={() => transaction}
          onTransactionConfirmed={handleSuccess}
          unstyled
          className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Create
        </TransactionButton>

      </div>

      {paymentLink && (
        <div className="mx-8 mt-4 p-4 bg-white rounded-xl">
          <p>Your payment link:</p>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
            {paymentLink}
          </a>
        </div>
      )}

    </div>


  );
} 
