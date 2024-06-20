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
} from "thirdweb/wallets";

import { inAppWallet, preAuthenticate } from "thirdweb/wallets/in-app";

import { useConnect } from "thirdweb/react";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet", {
    walletConfig: {
      options: "smartWalletOnly",
    },    
  }),
  // inAppWallet({
  //   auth: {
  //     options: [
  //       "email",
  //       "google",
  //       "apple",
  //       "facebook",
  //       "phone",
  //     ],
  //   },
  // }),
];

export default function LoginScreenComponent() {

  const { connect } = useConnect();

  const handleGoogleLogin = async () => {
    await connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client: thirdwebClient,
        strategy: "google",
        chain: defineChain(baseSepolia),
      });
      return wallet;
    });
  };

  const handleFacebookLogin = async () => {
    await connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client: thirdwebClient,
        strategy: "facebook",
        chain: defineChain(baseSepolia),
      });
      return wallet;
    });
  };

  const handleAppleLogin = async () => {
    await connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client: thirdwebClient,
        strategy: "apple",
        chain: defineChain(baseSepolia),
      });
      return wallet;
    });
  };

  const preEmailLogin = async (email: string) => {
    // send email verification code
    await preAuthenticate({
      client: thirdwebClient,
      strategy: "email",
      email,
    });
    const verificationCode = prompt("Enter your verificationCode");
    if (verificationCode) {
      await handleEmailLogin(email, verificationCode);
    }
  };
   
  const handleEmailLogin = async (email: string, verificationCode: string) => {
    // verify email and connect
    await connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client: thirdwebClient,
        strategy: "email",
        email,
        verificationCode,
        chain: defineChain(baseSepolia),
      });
      return wallet;
    });
  };  

  const prePhoneLogin = async (phoneNumber: string) => {
    // send phone OTP code
    await preAuthenticate({
      strategy: "phone",
      phoneNumber,
      client: thirdwebClient,
    });
    const verificationCode = prompt("Enter your verificationCode");
    if (verificationCode) {
      await handlePhonelLogin(phoneNumber, verificationCode);
    }
  }  

  const handlePhonelLogin = async (phoneNumber: string, verificationCode: string) => {
    // verify phone and connect
     await connect(async () => {
       const wallet = inAppWallet();
       await wallet.connect({
         client: thirdwebClient,
         strategy: "phone",
         phoneNumber,
         verificationCode,
         chain: defineChain(baseSepolia),
        });
       return wallet;
    });
  }; 

  const handleContinueWithEmail = async () => {
    const email = prompt("Enter your email address");
    if (email) {
      await preEmailLogin(email);
    }
  }

  const handleContinueWithPhone = async () => {
    const phoneNumber = prompt("Enter your phone number");
    if (phoneNumber) {
      await prePhoneLogin(phoneNumber);
    }
  };

    return (
        <main className="flex items-center justify-center h-screen p-8">
        <div className="space-y-4 text-center">
          <Image src="/logo.png" alt="Birdlypay"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', marginBottom: '25px'}} />
  
          {/* <ConnectButton
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
          />    */}

          <Button onClick={handleGoogleLogin}>Log In with Google</Button><br/>

          <Button onClick={handleFacebookLogin}>Log In with Facebook</Button><br/>

          <Button onClick={handleAppleLogin}>Log In with Apple</Button><br/>

          <Button onClick={handleContinueWithEmail}>Continue With Email</Button><br/>

          <Button onClick={handleContinueWithPhone}>Continue With Phone</Button><br/>

          <ConnectButton 
            client={thirdwebClient} 
            wallets={wallets} 
            theme={"light"}
            connectModal={{ size: "compact" }}
            connectButton={{ label: "Log In with Wallet" }} />

        </div>
      </main>
    )  
}