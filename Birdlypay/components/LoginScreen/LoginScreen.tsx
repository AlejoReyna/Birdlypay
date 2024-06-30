"use client";

import TypewriterEffect from './TypewriterEffect';
// List of icons:
import emailIcon from './Icons/emailIcon.png';
import walletIcon from './Icons/walletIcon.png';
import baseIcon from './Icons/baseIcon.png';

import './LoginScreen.css';
import Image from "next/image";
import { Button } from "@/components/ui/button"

import { thirdwebClient } from "../../utils/thirdweb";

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
  
];

export default function LoginScreenComponent() {

  const { connect } = useConnect();
  const handleCoinbaseLogin = async () => {
    await connect(async () => {
      const wallet = createWallet("com.coinbase.wallet", {
        walletConfig: {
          options: "smartWalletOnly",
        },
      });
      await wallet.connect({
        client: thirdwebClient,
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


  const handleContinueWithEmail = async () => {
    const email = prompt("Enter your email address");
    if (email) {
      await preEmailLogin(email);
    }
  }



    return (

        <main className="bg-gif flex justify-center">
         <div className="login-menu bg-new rounded min-h-screen flex flex-col justify-center items-center">
            
            <div className='logo-container flex justify-center'>
              <Image 
                src="/logo.png"
                alt="Birdlypay"
                className='birdlyLogo'
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '60%', height: 'auto'}} 
              />
              
            </div>
              
            <div className='ad-text flex justify-center mb-8'>
              <TypewriterEffect text="Welcome, start here" delay={50} />
            </div>

            <div className='menu space-y-4'>
    
              <Button className='loginBtn fixedWidth' onClick={handleContinueWithEmail}> 
                <Image className="loginImg"src={emailIcon} alt="Email icon"/> 
                Continue with Email
              </Button>
               <br/>

              <Button className='loginBtn fixedWidth' onClick={handleCoinbaseLogin}>
                <Image className='loginImg' src={baseIcon} alt="Base icon"/>
                Continue with BaseWallet 
              </Button> 

              <div className='specialBtn fixedWidth'>
                <ConnectButton 
                  client={thirdwebClient} 
                  wallets={wallets} 
                  theme={"light"}
                  connectModal={{ size: "compact" }}
                  connectButton={{ 
                    label: (
                      <>
                      <Image src={walletIcon}
                      alt='Wallet icon'
                      className="loginImg"/>
                        Continue with Wallet
                      </>
                    ) }} 
                />
              </div>
            </div>
        </div>

      </main>
    )  
}