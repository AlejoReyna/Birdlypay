"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { thirdwebClient } from "../../utils/thirdweb";
import { baseSepolia, defineChain } from "thirdweb/chains";
import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";
import { useConnect } from "thirdweb/react";
import { useConnectedWallets } from "thirdweb/react";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function BalanceComponent() {
  const [balanceValue, setBalanceValue] = useState("0.000");
  const [currency, setCurrency] = useState("ETH");
  const wallets = useConnectedWallets();

  useEffect(() => {
    async function getBalance() {
        if (wallets.length > 0) {
          try {
            if (typeof window.ethereum !== 'undefined') {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const address = await signer.getAddress();
              const balance = await provider.getBalance(address);
              const formattedBalance = ethers.utils.formatEther(balance);
              setBalanceValue(parseFloat(formattedBalance).toFixed(3));
              setCurrency("ETH");
            } else {
              console.log("Please install MetaMask!");
            }
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        }
      }
  
      getBalance();
    }, [wallets]);
  
    if (wallets.length === 0) {
      return <div>Please connect your wallet</div>;
    }
  
    
  return (
    <div>
      <div className="font-bold text-xl mb-2 actor-font">
        {balanceValue}
      </div>
      <p className="text-gray-700 text-base actor-font">
        Currency: {currency}
      </p>
    </div>
  );
}