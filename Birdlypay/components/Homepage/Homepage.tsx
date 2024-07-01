"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import BalanceComponent from "../Balance/Balance";
import myWallet from './my-wallet.png';
import stakingIcon from './stake.png';
import marketIcon from './market.png';
import goalsIcon from './star.png';
import chainIcon from './chain.png';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import './Homepage.css';
import { User } from "lucide-react";
import UserTransactionsComponent from "../UserTransactions";

export default function HomepageComponent() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGoals = () => {
    router.push('/myGoals');
  }

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
            <Image src={chainIcon} className="w-12 h-12" alt="A bird icon" />
            <p className="italic">Paylink</p>
          </div>

          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center
                          cursor-pointer hover:bg-gray-100" onClick={handleStaking}>

            <Image src={stakingIcon} className="w-12 h-12" alt="A coin icon" />
            <p className="italic">My staking</p>
          </div>

          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center">
            <Image src={marketIcon} className="w-12 h-12" alt="A stocks icon" />
            <p className="italic">Birdly Market</p>
          </div>

        </div>

        <div className="flex justify-center gap-4 p-4">
          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center
           cursor-pointer hover:bg-gray-100" onClick={handleGoals}>
            <Image src={goalsIcon} className="w-12 h-12" alt="A goals icon" />
            <p className="italic">Goals</p>
          </div>
          <div className="flex flex-col w-24 h-24 aspect-square bg-white rounded-lg shadow items-center justify-center">
            <Image src={myWallet} className="w-12 h-12" alt="A wallet icon" />
            <p className="italic">Wallets</p>
          </div>
          <div className="flex flex-col w-24 h-24 aspect-square bg-gray-200 rounded-lg shadow items-center justify-center">
            <span className="text-4xl">+</span>
          </div>
        </div>
        {/** End of the main icons */}

      
      {/** Begining of card below icons  */}
      <div className="relative">
          
          <div
            
          >
            <Card className="p-4 bg-white rounded-t-lg shadow-lg">
              <CardHeader className="flex justify-between items-center">

                {/** Balance container */}
                <div className="flex shadow-xl rounded-full m-4   flex justify-between items-center">
                  <BalanceComponent />
                </div>
                {/** End of balance container */}

              </CardHeader>
              <CardContent>

                <div className="flex justify-between items-center mb-4">
                  <Label className="text-xl font-bold text-blue-600">Movements</Label>
                  <Button variant="link" className="text-blue-600">
                    view all
                  </Button>
                </div>

                <UserTransactionsComponent />

              </CardContent>
              <div className="flex justify-around mt-4">
                <Button className="bg-blue-600 text-white flex items-center">
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Pay link
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-600 flex items-center">
                  <QrCodeIcon className="w-5 h-5 mr-2" />
                  QR Scan
                </Button>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </>
  );
}

function EyeIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function LinkIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}


function QrCodeIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}

