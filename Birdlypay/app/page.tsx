"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"

import { thirdwebClient } from "../utils/thirdweb";

import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";

import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>

      <ConnectButton
        client={thirdwebClient}
        wallets={wallets}
        theme={"light"}
        connectModal={{
          size: "compact",
          title: "Birdlypay",
          titleIcon:
            "https://bafybeidc63fbknjzs5aiedihq5v4rvh6reugfvwflw2wt5booom7dixj2u.ipfs.w3s.link/Birdlypay.png",
        }}
      />

    </main>
  );
}
