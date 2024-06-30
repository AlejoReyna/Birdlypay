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
        <div className="container-fluid bg-dark">
        
        {/** Begining of the main icons */}
        <div className="grid grid-cols-3 gap-4 p-4">
        <div className="w-20 h-20 aspect-square bg-white rounded-lg shadow flex items-center justify-center
                        cursor-pointer hover:bg-gray-100" onClick={handlePaylink}>
        <Image src={birdIcon} className="w-12 h-12" alt="A bird icon"/>

        </div>
        <div className="w-20 h-20 aspect-square bg-white rounded-lg shadow flex items-center justify-center
                        cursor-pointer hover:bg-gray-100" onClick={handleStaking}>
          
          <Image src={ethIcon} className="w-12 h-12" alt="A coin icon" />
        </div>
        <div className="w-20 h-20 aspect-square bg-white rounded-lg shadow flex items-center justify-center">
          <Image src={stockIcon} className="w-12 h-12" alt="A stocks icon"/>
        </div>
        <div className="w-20 h-20 aspect-square bg-white rounded-lg shadow flex items-center justify-center">
          <Image src={goalsIcon} className="w-12 h-12" alt="A goals icon" />
        </div>
        <div className="w-20 h-20 aspect-square bg-white rounded-lg shadow flex items-center justify-center">
          <Image src={myWallet} className="w-12 h-12" alt="A wallet icon"/>
        </div>
        <div className="w-20 h-20 aspect-square bg-gray-200 rounded-lg shadow flex items-center justify-center">
          <span className="text-4xl">+</span>
        </div>
       </div>
        {/** End of the main icons */}

        {/** Begining of the container below */}
        <div className="flex flex-col w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          {/** Balance container */}
          <div className="flex rounded-xl m-4 border-2 border-black   flex justify-between items-center">
            <BalanceComponent />
          </div>
          {/** End of balance container */}

          <div className="p-4 flex justify-between items-center">
            <p> Movements </p>
          </div>
        </div>
        {/** End of the container below  */}

    
        </div>
        </>
    );
}