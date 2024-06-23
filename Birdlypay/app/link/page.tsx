"use client";
import { useState } from "react";
import Image from "next/image";
import { ThirdwebProvider, ConnectWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ethers } from "ethers";

export default function LinkComponent() {
  const [paymentTitle, setPaymentTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const handleCreateLink = async () => {
    if (typeof window === 'undefined' || !('ethereum' in window)) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Create a unique identifier for this payment
      const paymentId = ethers.utils.id(Date.now().toString() + address);

      // Create the payment link
      const link = `${window.location.origin}/pay/${paymentId}?title=${encodeURIComponent(paymentTitle)}&amount=${amount}&address=${address}`;
      
      setPaymentLink(link);
    } catch (error) {
      console.error("Error creating payment link:", error);
      alert("Error creating payment link. Please try again.");
    }
  }

  return (
    <ThirdwebProvider activeChain={Sepolia}>
      <div className="container-fluid bg-black min-h-screen text-white p-6">
        <div className='flex flex-col items-center'>
          <h1 className="text-3xl mb-6">Create Payment Link</h1>
          
          <ConnectWallet />

          <div className="w-full max-w-md mt-6">
            <input
              className="w-full p-2 mb-4 text-black rounded"
              value={paymentTitle}
              onChange={(e) => setPaymentTitle(e.target.value)}
              placeholder="Enter payment title"
            />
            
            <input
              className="w-full p-2 mb-4 text-black rounded"
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in USD"
            />
            
            <button 
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreateLink}
            >
              Create Link
            </button>
          </div>

          {paymentLink && (
            <div className="mt-6 p-4 bg-white text-black rounded-xl w-full max-w-md">
              <h2 className="text-xl mb-2">Success!</h2>
              <p>Your payment link:</p>
              <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
                {paymentLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </ThirdwebProvider>
  );
}