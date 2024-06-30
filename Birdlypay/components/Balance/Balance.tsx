"use client"
import { useConnectedWallets } from "thirdweb/react";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { ethers } from 'ethers';
import eyeIcon from './eye.png';
import changeIcon from './change.png';
import eyeIcon2 from './eye-2.png';

interface BalanceComponentProps {
  onUsdBalanceChange?: (balance: string) => void;
}

export default function BalanceComponent({ onUsdBalanceChange }: BalanceComponentProps) {
  const [balanceValue, setBalanceValue] = useState("0.000");
  const [currency, setCurrency] = useState("ETH");
  const wallets = useConnectedWallets();
  const [usdValue, setUsdValue] = useState("0.00");
  const [showUsd, setShowUsd] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    async function getEthPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        return data.ethereum.usd;
      } catch (error) {
        console.error("Error fetching ETH price:", error);
        return null;
      }
    }

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

            const ethPrice = await getEthPrice();
            if (ethPrice) {
              const usdBalance = (parseFloat(formattedBalance) * ethPrice).toFixed(2);
              setUsdValue(usdBalance);
              if (onUsdBalanceChange) {
                onUsdBalanceChange(usdBalance);
              }
            }
          } else {
            console.log("Please install MetaMask!");
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    }

    getBalance();
  }, [wallets, onUsdBalanceChange]);

  const toggleDisplay = () => {
    setShowUsd(!showUsd);
    setCurrency(showUsd ? "ETH" : "USD");
  };

  const toggleHideBalance = () => {
    setHideBalance(!hideBalance);
  };

  if (wallets.length === 0) {
    return <div>Please connect your wallet</div>;
  }

  const displayBalance = hideBalance ? "******" : (showUsd ? `$${usdValue}` : `${balanceValue}`);

  return (
    <div className="flex justify-between items-center w-full">
      <div className='hide flex items-center p-2 cursor-pointer' onClick={toggleHideBalance}>
        <Image src={hideBalance ? eyeIcon2 : eyeIcon} className="w-6 h-6" alt='Eye icon'/>
        <p className="ml-2">{hideBalance ? "Show balance" : "Hide balance"}</p>
      </div>
      <div className="currency-value p-2 flex items-center">
        <p className="flex text-gray-700 text-base actor-font">
          {displayBalance} {currency}
        </p>
        <Image
          src={changeIcon}
          className="w-6 h-6 cursor-pointer ml-2"
          alt='Change icon'
          onClick={toggleDisplay}
        />
      </div>
    </div>
  );
}