"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomepageComponent from '@/components/Homepage/Homepage'; 
import PaylinkComponent from "@/components/Payment/Payment";

export default function Home() {

  const [activeComponent, setActiveComponent] = useState<'home' | 'payment'>('home');

  const showHome = () => setActiveComponent('home');
  const showPayment = () => setActiveComponent('payment');

  
  return (

    <ThirdwebProvider>
      <HomepageComponent/>
    </ThirdwebProvider>


  );
}
