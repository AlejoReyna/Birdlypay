"use client";

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
    <>
      { !(wallets.length>0) && (
        <LoginScreenComponent />
      )}
      { (wallets.length>0) && (
        <HeaderComponent />
      ) }

    </>
  );
}
