"use client"

import './staking.css';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Dropdown from "@/components/Dropdown"
import HomepageComponent from '@/components/Homepage/Homepage'; // Ruta al componente
import BalanceComponent from "@/components/Balance/Balance";

import { ConnectButton, ThirdwebProvider, TransactionButton, useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { readContract, prepareContractCall } from "thirdweb";
import { createThirdwebClient, getContract, resolveMethod, ThirdwebContract } from "thirdweb";
import { balanceOf } from "thirdweb/extensions/erc20";
import { contract } from '../payment/page';
import { REWARD_TOKEN_CONTRACT, STAKE_TOKEN_CONTRACT, STAKING_CONTRACT} from '@/utils/contracts';
import { toEther } from 'thirdweb/utils';
import { Button } from '@/components/ui/button';

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});


export default function Staking() {
  const router = useRouter(); 

  const handleHome = () => {
    router.push('/home'); // Redirects to Homepage.tsx
  }

  const balanceValue = "0.000"; // Ejemplo de balanceValue, debes integrar tu lógica para obtener el balance aquí
  const currency = "ETH"; // Ejemplo de currency, debes integrar tu lógica para obtener la moneda aquí
  const [usdBalance, setUsdBalance] = useState("0.00");
  const [stakeAmount, setStakeAmount] = useState("0");

  const account = useActiveAccount();

  const { 
    data: stakingTokenBalance, 
    isLoading: loadingStakeTokenBalance
  } = useReadContract(
    balanceOf,
    {
      contract: STAKE_TOKEN_CONTRACT,
      address: account?.address || "",
      queryOptions: {
        enabled: !!account,
      }
    }
  );

  const { 
    data: rewardTokenBalance, 
    isLoading: loadingRewardTokenBalance
  } = useReadContract(
    balanceOf,
    {
      contract: REWARD_TOKEN_CONTRACT,
      address: account?.address || "",
      queryOptions: {
        enabled: !!account,
      }
    }
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
  } = useReadContract({
      contract: STAKING_CONTRACT,
      method: "getStakeInfo",
      params: [account?.address || ""],
      queryOptions: {
        enabled: !!account,
      }
  });

  function truncate(value: string | number, decimalPlaces: number) {
    const numericValue: number = Number(value);
    if (isNaN(numericValue)) {
      throw new Error("Value is not a number");
    }
    const factor: number = Math.pow(10, decimalPlaces);
    return Math.trunc(numericValue * factor) / factor;
  }

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    },10000)
  })


  return (
    
    <div className='container-fluid bg-dark pb-24 h-screen'>
      {/* First row */}
      <div className='flex flex-col'>
          
          <div className="w-full flex justify-between p-4">
              <div className='btn-container justify-start m-4'>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
                  onClick={handleHome}> Back </button>                    
              </div>
              <div className='justify-end m-4'>
                  <ConnectButton client={client} />
              </div>
          </div>          

          <div className="w-1/2 ml-4">
            <h6 className='text-white text-3xl row-title'> Staking </h6>
          </div>
      </div>

      <div className="flex text-white">
         <p className="m-8">Stake Token Balance:  {truncate(toEther(BigInt(stakingTokenBalance|| 0)), 2)}</p>
         <p className="m-8">Reward Token Balance:  {truncate(toEther(BigInt(rewardTokenBalance|| 0)), 2)}</p>
      </div>


      <div className="flex justify-between items-center mx-8 mt-8 py-2 px-4 bg-white rounded-xl">
        <div className="flex items-center">
          <Image src={"/eth.png"} alt="Birdlypay" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '50px', margin: '5px'}}
          />
          <h6 className='font-bold align-middle	'> ETH </h6>
        </div>

      </div>

      <p className='text-white ml-8 mt-8'> Amount </p>

      <div className="flex justify-between items-center mx-8 mt-4 p-4 bg-white rounded-xl">
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        className='font-bold w-full'
        placeholder="0 USD"
      />
        <button className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
        onClick={() => setStakeAmount(usdBalance)}
        >
          Max
        </button>
      </div>

      <div className="w-full flex justify-center my-8">


      {stakeInfo &&(
        <div>
        <button className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mx-2">
          Stake
        </button>
        <button className="bg-[#24F129] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mx-2">
          Withdraw
        </button>
        </div>
      )}        
      </div>
  </div>


  );
}