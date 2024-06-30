"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import BalanceComponent from "../Balance/Balance";
import myWallet from './my-wallet.png';
import ethIcon from './eth.png';
import stockIcon from './stock.png';
import goalsIcon from './goals.png';
import birdIcon from './bird.png';



import './Homepage.css';

export default function HomepageComponent () {
  const router = useRouter(); 

  const handleStaking = () => {
    router.push('/staking'); 
  };

  const handlePaylink = () => {
    router.push('/payment');
  }

    return (
        <>
        <div className="container-fluid min-h-screen bg-dark">
        
        {/** Begining of the main icons */}
        <div className="flex justify-center gap-4 p-4">

          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center
                          cursor-pointer hover:bg-gray-100" 
                          onClick={handlePaylink}>
            <Image src={birdIcon} className="w-12 h-12" alt="A bird icon"/>
            <text className="italic">Paylink</text>
          </div>

          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center
                          cursor-pointer hover:bg-gray-100" onClick={handleStaking}>
            
            <Image src={ethIcon} className="w-12 h-12" alt="A coin icon" />
            <text className="italic">Staking</text>
          </div>

          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center">
            <Image src={stockIcon} className="w-12 h-12" alt="A stocks icon"/>
            <text className="italic">Stocks</text>
          </div>

        </div>

        <div className="flex justify-center gap-4 p-4">
          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center">
            <Image src={goalsIcon} className="w-12 h-12" alt="A goals icon" />
            <text className="italic">Goals</text>
          </div>
          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center">
            <Image src={myWallet} className="w-12 h-12" alt="A wallet icon"/>
            <text className="italic">Wallet</text>
          </div>
          <div className="flex flex-col w-24 h-24 aspect-square bg-gray-200 rounded-lg shadow items-center justify-center">
            <span className="text-4xl">+</span>
          </div>
       </div>
        {/** End of the main icons */}

        {/** Begining of the container below */}
        <div className="flex flex-col bg-white min-h-screen rounded-3xl shadow-lg overflow-hidden">
          {/** Balance container */}
          <div className="flex shadow-xl rounded-full m-4   flex justify-between items-center">
            <BalanceComponent />
          </div>
          {/** End of balance container */}

          <div className="p-4 flex justify-between items-center">
            <p> Movements </p>
            <hr></hr>
            <hr></hr>
          </div>
        </div>
        {/** End of the container below  */}

    
        </div>
        </>
    );
}