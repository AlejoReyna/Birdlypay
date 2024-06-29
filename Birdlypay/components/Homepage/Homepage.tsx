"use client";
import { thirdwebClient } from "../../utils/thirdweb";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import BalanceComponent from "../Balance/Balance";

import './Homepage.css';

import {
    ThirdwebProvider,
    ConnectButton,
  } from "thirdweb/react";

import { baseSepolia, defineChain } from "thirdweb/chains";

export default function HomepageComponent () {
  const router = useRouter(); 

  // Redirects to Staking.tsx
  const handleStaking = () => {
    router.push('/staking'); 
  };

  const handlePaylink = () => {
    router.push('/payment');
  }


    return (
        <>
        <div className="container-fluid bg-black">
        <div className='flex py-6'>
          <div className="w-1/2">
            <h6 className='text-white row-title'> Balance </h6>
          </div>

          <div className="w-1/2">
            <div className='btn-container flex justify-end'>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
               onClick={handlePaylink}> Create Paylink </button>
            </div>
          </div>
      </div>

      <div className='flex justify-center py-3'>
        {/* Card containing the balance */}
        <div className="balance-card overflow-hidden shadow-lg bg-white rounded-[12px]">
        
            <BalanceComponent />
        </div>
        {/* End of card containing the card */}
      </div>

        <h6 className='text-white row-title py-6'> Lifestyle </h6>

        {/* Card ? */}
        <div className='flex justify-center py-3'>

          <div className="flex justify-center text-white">
            Add a goal!
          </div>
        </div>

        <h6 className='text-white row-title'> Investments </h6>
        <div className='flex justify-center py-4'>
          {/* Card of staking */}
          <div className='balance-card  rounded-[12px] bg-white text-center mb-5'>
            
            <h6 className='font-bold actor-font'> Staking - Under construction </h6>
            <div className='flex'>
             
              <button className="btn-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 actor-font" 
              onClick={handleStaking}>
                Button
              </button>

             
            </div>
          </div>

          
          </div>
        </div>
        </>
    );
}