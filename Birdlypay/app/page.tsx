"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home'); // Redirect to the login page after 3 seconds
    }, 4000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [router]);

  return (
  <div className="flex items-center justify-center h-screen bg-dark">
      <Image src="/launch.gif" alt="Loading..." 
        fill
        className="object-cover" 
        priority />
  </div>
  );
}
