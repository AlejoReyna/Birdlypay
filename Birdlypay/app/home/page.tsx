"use client";

import './page.css';

import { useConnect,  } from "thirdweb/react";
import { useConnectedWallets } from "thirdweb/react";

import Image from "next/image";
import { Button } from "@/components/ui/button"

import { thirdwebClient } from "../../utils/thirdweb";

import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";

import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import LoginScreenComponent from "@/components/LoginScreen";
import HeaderComponent from "@/components/header";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
];


export default function Home() {

  const { connect, isConnecting, error } = useConnect();
  const wallets = useConnectedWallets();

  console.log("wallets", wallets);

  return (
    <div className='container-fluid bg-black '>
    { !(wallets.length>0) && (
        <LoginScreenComponent />
      )}
      <div className='py-6 bg-black'>
      { (wallets.length>0) && (
        <HeaderComponent />
      ) }
      </div>
     

      {/* First row */}
      <div className='flex py-6'>
          <div className="w-1/2">
            <h6 className='text-white row-title'> Balance </h6>
          </div>

          <div className="w-1/2">
            <div className='btn-container flex justify-end'>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"> Create Paylink </button>
            </div>
          </div>
      </div>

      {/* Second row: Card row */}
      <div className='flex justify-center py-3'>
        <div className="value-card max-w-4xl overflow-hidden shadow-lg bg-white rounded-[12px]">
        
          <div className="px-6 py-4">
            {/* Here must go the value of the balance */}
            <div className="font-bold text-xl mb-2 actor-font"> balanceValue </div>
              <p className="text-gray-700 text-base actor-font">
                Currency: currency
              </p>
          </div>
        </div>
      </div>

      {/* Third row */}
        <h6 className='text-white row-title py-6'> Lifestyle </h6>
        <div className='flex'>

          <div className="w-1/2 bg-white m-4 rounded-[12px]">
            <div className="max-w-sm small-card rounded-[12px]">
              <h6 className='font-bold'> Vacations </h6>
              <p> Goal: value </p>
              <p> Progress: value </p>
              <button className="btn-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Button
              </button>
            </div>
          </div>

          <div className="w-1/2 bg-white m-4 rounded-[12px]">
            <div className="max-w-sm  small-card">
                <h6 className='font-bold'> Vacations </h6>
                <p> Goal: value </p>
                <p> Progress: value </p>
                <button className="btn-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Button
                </button>
            </div>
          </div>
        </div>

        {/* Fourth row */}
        <h6 className='text-white row-title'> Investments </h6>
        <div className='flex justify-center py-4'>
          <div className='value-card max-w-lg rounded bg-white text-center mb-5'>
            
            <h6 className='font-bold actor-font'> Staking </h6>
            <div className='flex'>
              <div className='w-1/2'>
              <button className="btn-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 actor-font">
                Button
              </button>
              </div>

              <div className='w-1/2'>
              <button className="btn-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 actor-font">
                Button
              </button>
              </div>

            </div>
          </div>

          
          
        </div>
      
  </div>
  
  
  );
}
