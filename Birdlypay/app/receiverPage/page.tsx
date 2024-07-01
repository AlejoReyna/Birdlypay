"use client"

import { useRouter, useSearchParams  } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Image from "next/image";
//import { useRouter } from 'next/router';
import { createThirdwebClient, getContract, resolveMethod, ThirdwebContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { ConnectButton, ThirdwebProvider, TransactionButton } from "thirdweb/react";
import PaymentComponent from '@/components/Payment';

export default function ReceiverPage() {
  const router = useRouter();
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentComponent />
      </Suspense>
   );
}