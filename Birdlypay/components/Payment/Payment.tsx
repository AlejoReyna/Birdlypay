"use client";

import './Payment.css';

import { useConnect,  } from "thirdweb/react";
import { useConnectedWallets } from "thirdweb/react";

import Image from "next/image";
import Dropdown from "@/components/Dropdown"


import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import LoginScreenComponent from "@/components/LoginScreen/LoginScreen";
import HeaderComponent from "@/components/Header/Header";

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


export default function PaylinkComponent() {
  
  
  const { connect, isConnecting, error } = useConnect();
  const wallets = useConnectedWallets();

  console.log("wallets", wallets);

  return (
    <div className='container-fluid bg-black pb-8 h-screen'>
      {/* First row */}
      <div className='flex flex-col'>
          <div className="w-1/2">
            <div className='btn-container flex justify-start m-4'>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
              > Back </button>
            </div>
          </div>
          <div className="w-1/2">
            <h6 className='text-white row-title'> PayLink </h6>
          </div>
      </div>
      <p className='text-white ml-8 mt-8'> Payment title </p>

      <div className="flex justify-center mx-8 mt-4 p-4 bg-white rounded-xl">
        <h6 className='font-bold'> Pay for web development </h6>
      </div>

      <div className="flex justify-between items-center mx-8 mt-4 py-2 px-4 bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <Image src={"/eth.png"} alt="Birdlypay" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '50px', margin: '5px'}}
          />
          <h6 className='font-bold align-middle	'> ETH </h6>
        </div>
        <Dropdown />
      </div>

      <p className='text-white ml-8 mt-8'> Amount </p>

      <div className="flex justify-center mx-8 mt-4 p-4 bg-white rounded-xl">
        <h6 className='font-bold'> permanent: $1000 USD - 0.29 ETH </h6>
      </div>

      <div className="flex justify-center mx-8 mt-4 p-4 bg-white rounded-xl">
        <h6 className='font-bold'> Variable: There is no fixed payment amount </h6>
      </div>

      <div className="w-full flex justify-center my-8">
        <button className="btn-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl	">
          Create
        </button>
      </div>
      
  </div>
  
  
  );
}
