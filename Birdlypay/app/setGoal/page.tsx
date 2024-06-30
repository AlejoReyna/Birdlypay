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
  address: "0xd883A13b298a6A05196b3Afc68FA682b210c64Dc"
});

export default function SetGoal() {
  const router = useRouter();
  const [paymentTitle, setPaymentTitle] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [address, setAddress] = useState("");
  const newGuid: string = uuidv4();

  // Redirects to Homepage.tsx
  const handleHome = () => {
    router.push('/home');
  }

  // const handleLink=  async() => {
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
  //     const link = `${window.location.origin}/paymentLink?title=${encodeURIComponent(paymentTitle)}&amount=${amount}&address=${address}`;

  //     // Set the payment link in the state
  //     setPaymentLink(link);

  //     // Navigate to the paymentLink page with the generated link
  //     router.push(link);
  //   } catch (error) {
  //     console.error("Error creating payment link:", error);
  //     alert("Error creating payment link. Please try again.");
  //   }
  // };  


  const transaction = prepareContractCall({
    contract,
    method: "function createPaymentLink(uint256 amount, string title, string guid)",
    params: [BigInt(amount), paymentTitle, newGuid]

  });

  const readWalletInfo = async (data: any) => {
    console.log("Wallet connected: ", data);
    const account = data.getAccount();
    console.log("Address: ", account?.address);
    setAddress(account?.address);
  }
  const handleCreateLink = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Create a unique identifier for this payment
      const paymentId = ethers.utils.id(Date.now().toString() + address);

      // Create the payment link
      const link = `${window.location.origin}/paymentPage?title=${encodeURIComponent(paymentTitle)}&amount=${amount}&address=${address}`;


      setPaymentLink(link);
    } catch (error) {
      console.error("Error creating payment link:", error);
      alert("Error creating payment link. Please try again.");
    }
  }

  const handleSuccess = (receipt: any) => {
    console.log("Payment link created successfully. receipt: ", receipt);
    const link = `${window.location.origin}/paymentLink?title=${encodeURIComponent(paymentTitle)}&amount=${amount}&address=${address}`;
    // Set the payment link in the state
    setPaymentLink(link);
    // Navigate to the paymentLink page with the generated link
    router.push(link);
  }
  return (
    <div className='flex flex-col bg-black h-max min-h-screen'>
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
          <h6 className='text-white text-3xl'> Set Goal </h6>
        </div>
      </div>
      <p className='text-white ml-8 mt-8'> Goal title </p>

      {/** Here must go the payment title */}
      <div className="flex justify-center mx-8 mt-4 p-1 bg-white rounded-xl">
        <input
          style={{ width: '100%', outline: 'none' }}
          value={paymentTitle}
          onChange={(e) => setPaymentTitle(e.target.value)}
          placeholder="Enter a goal"
          className='p-2'
        />
      </div>
      {/** End of payment title input */}
      <p className='text-white ml-8 mt-8'> Amount </p>
      <div className="flex justify-between items-center mx-8 mt-4">
        <div className="flex justify-between items-center py-2 px-4 bg-white rounded-xl">
          <div className="flex justify-between items-center ">
            <Image src={"/eth.png"} alt="Birdlypay"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: '25px', margin: '5px' }}
            />
            <h6 className='font-bold'> ETH </h6>
          </div>
          <Dropdown />
        </div>
        <div className="flex justify-between items-center py-2 px-4 bg-white rounded-xl">
          <div className="flex justify-between items-center ">
            <Image src={"/eth.png"} alt="Birdlypay"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: '25px', margin: '5px' }}
            />
            <h6 className='font-bold'> Base </h6>
          </div>
          <Dropdown />
        </div>
      </div>
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

      <p className='text-white ml-8 mt-8'> Deadline </p>

      <div className="flex justify-between items-center mx-8 mt-4 px-4 py-1 bg-white rounded-xl">
        <div className="flex items-center">
          <input
            style={{ width: '80%', outline: 'none' }}
            type='date'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='p-2 text-center'
          />
        </div>
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
    </div>


  );
} 