"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login'); // Redirect to the login page after 3 seconds
    }, 4000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [router]);

  return (
  <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#b6f8e2] via-[#d1f7e6] to-[#70f7c9]">
      <Image src="/launch.gif" alt="Loading..." 
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: '80%' }} />
  </div>
  );
}
