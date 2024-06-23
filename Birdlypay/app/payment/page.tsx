"use client"

import { useState } from 'react';
import Image from "next/image";
import Dropdown from "@/components/Dropdown"
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import PaymentPage from '../paymentPage/page';

export default function Payment() {
  const router = useRouter(); 
  const [paymentTitle, setPaymentTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [address, setAddress] = useState("");

  // Redirects to Homepage.tsx
  const handleHome = () => {
    router.push('/home'); 
  }

  const handleLink = () => {
    router.push('/link');
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

  return (
    <div className='container-fluid bg-black h-screen'>
      {/* First row */}
      <div className='flex flex-col'>
          <div className="w-1/2">
            <div className='btn-container flex justify-start m-4'>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
              onClick={handleHome}> Back </button>
            </div>
          </div>
          <div className="w-1/2 ml-4">
            <h6 className='text-white text-3xl'> PayLink </h6>
          </div>
      </div>
      <p className='text-white ml-8 mt-8'> Payment title </p>
        
      {/** Here must go the payment title */}
      <div className="flex justify-center mx-8 mt-4 p-4 bg-white rounded-xl">
        <input
         value={paymentTitle}
         onChange={(e) => setPaymentTitle(e.target.value)}
         placeholder="Enter payment title"
        />
      </div>
      {/** End of payment title input */}

      <div className="flex justify-between items-center mx-8 mt-4 py-2 px-4 bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <Image src={"/eth.png"} alt="Birdlypay" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '50px', margin: '5px'}}
          />
          <h6 className='font-bold align-middle	'> ETH </h6>
        </div>
        <Dropdown />
      </div>

      <p className='text-white ml-8 mt-8'> Amount </p>

      <div className="flex mx-8 mt-4 p-4 bg-white rounded-xl">
        <p> $ </p>
        <input 
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <p> USD </p>
      </div>

      <div className="flex mx-8 mt-4 p-4 bg-white rounded-xl">
        <h6 className='font-bold'> Variable: Alchile no para que sirva este input </h6>
      </div>

      <div className="w-full flex justify-center my-8">
        <button className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={ handleCreateLink}>
          Create
        </button>
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
