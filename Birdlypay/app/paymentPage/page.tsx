"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ethers } from 'ethers';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  
  const paymentId = searchParams.get('paymentId');
  const title = searchParams.get('title');
  const amount = searchParams.get('amount');
  const address = searchParams.get('address');

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!paymentId || !title || !amount || !address) return;

    const processPayment = async () => {
      if (!window.ethereum) {
        setStatus('Please install MetaMask!');
        return;
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Convertir el monto de USD a ETH (esto requeriría una API de tipo de cambio en una implementación real)
        const ethAmount = ethers.utils.parseEther(amount);

        const transaction = await signer.sendTransaction({
          to: address,
          value: ethAmount
        });

        await transaction.wait();
        setStatus('Payment successful!');
      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus('Error processing payment. Please try again.');
      }
    };

    processPayment();
  }, [paymentId, title, amount, address]);

  return (
    <div>
      <h1>{title}</h1>
      <p>Amount: ${amount}</p>
      <p>Status: {status}</p>
    </div>
  );
}