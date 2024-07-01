"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const handleNavigateToLink = () => {
    router.push('/link');
  };

  useEffect(() => {
      router.push('/landingPage'); // Redirect to the login page after 3 seconds
  }, [router]);

  return (
  <div >
      
  </div>
  );
}