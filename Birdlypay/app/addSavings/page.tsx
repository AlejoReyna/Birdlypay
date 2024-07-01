"use client"
import { useState, useEffect, Suspense } from 'react';
import { createThirdwebClient } from "thirdweb";
import { useRouter, useSearchParams } from 'next/navigation';
import { ConnectButton } from "thirdweb/react";
import AddSavingComponent from '@/components/AddSavings';


export default function AddSavings() {

  return(
    <Suspense fallback={<div>Loading...</div>}>
      <AddSavingComponent />
    </Suspense>    
  );
}