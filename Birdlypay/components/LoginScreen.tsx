"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"

import { thirdwebClient } from "../utils/thirdweb";

import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";

import { baseSepolia, defineChain } from "thirdweb/chains";

import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet", {
    walletConfig: {
      options: "smartWalletOnly",
    },    
  }),
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

export default function LoginScreenComponent() {
    return (
        <main className="flex items-center justify-center h-screen p-8">
        <div className="space-y-4 text-center">
          <Image src="/logo.png" alt="Birdlypay"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', marginBottom: '25px'}} />

       
                  
  
          <ConnectButton
            client={thirdwebClient}
            wallets={wallets}
            theme={"light"}
            connectButton={{ label: "Start" }}
            connectModal={{
              size: "compact",
              title: "Birdlypay",
              titleIcon:
                "https://bafybeidc63fbknjzs5aiedihq5v4rvh6reugfvwflw2wt5booom7dixj2u.ipfs.w3s.link/Birdlypay.png",
              showThirdwebBranding: false,
            }}
            chain={defineChain(baseSepolia)}
          />        
        </div>
      </main>
    )  
}