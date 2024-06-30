"use client"

import './Header.css';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { NavigationMenuLink, NavigationMenuItem, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import greenBird from './g-bird.jpeg';
import pinkBird from './p-bird.jpeg';
import purpleBird from './pp-bird.jpeg';
import { thirdwebClient } from "../../utils/thirdweb";
import { baseSepolia, defineChain } from "thirdweb/chains";

import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";

import { useConnect,  } from "thirdweb/react";
import { useConnectedWallets } from "thirdweb/react";

export default function HeaderComponent() {
  const [currentBirdIndex, setCurrentBirdIndex] = useState(0);
  const birdImages = [greenBird, pinkBird, purpleBird];

  const handleMyProfile = () => {

  }

  const { connect, isConnecting, error } = useConnect();
  const wallets = useConnectedWallets();
  const router = useRouter();

  const handleProfile = () => {
    router.push('/myprofile'); 
  }

  const handleDisconnect = () => {
    // Handle the disconnect event here
    console.log("Wallet disconnected");
    router.push('/'); // Redirect to the login page after 3 seconds
  };  

  const changeBirdImage = (direction) => {
    setCurrentBirdIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % birdImages.length;
      } else {
        return (prevIndex - 1 + birdImages.length) % birdImages.length;
      }
    });
  };

  return (
    <header className="sticky  top-0 z-50 flex items-center justify-between px-8 py-4 rounded-2xl  ">

    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-dark text-white border-0 " size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-100 bg-dark text-white" side="left">
        <nav className="grid gap-2 py-4 ">
          
      {(wallets.length>0) ? (
        <>
        <div>
        <div className='flex flex-col items-center mt-8'>
                    <div className="flex items-center">
                      <Button onClick={() => changeBirdImage('prev')} className="mr-2">
                        &#8592; {/* Left arrow */}
                      </Button>
                      <Image
                        className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                        src={birdImages[currentBirdIndex]}
                        alt=""
                      />
                      <Button onClick={() => changeBirdImage('next')} className="ml-2">
                        &#8594; {/* Right arrow */}
                      </Button>
                    </div>
                  </div>

        <p className='mt-2 text-white text-center'> Account </p>
      <p className='mt-4 text-white text-xl text-center italic'> yourUserName </p>
      <p className='mt-4 text-blue-700 text-center cursor-pointer'> Edit profile </p>
      <div className='ml-8 mt-8'>
        <div className="flex mt-2 py-2 px-4 rounded-xl cursor-pointer text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <p className="ml-2 font-bold">
            My account
          </p>
        </div>
        <div className="flex mt-2 py-2 px-4 rounded-xl cursor-pointer text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <p className="ml-2 font-bold">
            Notifications
          </p>
        </div>
        <div className="flex mt-2 py-2 px-4 rounded-xl cursor-pointer text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          <p className="ml-2 font-bold">
            Support
          </p>
        </div>
        <div className="flex mt-2 py-2 px-4 rounded-xl cursor-pointer text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          <p className="ml-2 font-bold">
            Refer a friend
          </p>
        </div>
        <div className="flex mt-2 py-2 px-4 rounded-xl cursor-pointer text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
          </svg>
          <p className="ml-2 font-bold">
            Birdly Market
          </p>
        </div>
        <div className="flex mt-2 py-2 px-4 rounded-xl cursor-pointer text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <p className="ml-2 font-bold">
            TyC
          </p>
        </div>
      </div>

      <p className='my-8 text-white text-center font-bold cursor-pointer'> Logout </p>

    </div>
      
          </>
      ): null}


        </nav>
      </SheetContent>
    </Sheet>

    

    <Link className="items-center gap-2 flex lg:hidden" href="/">
     <p className='text-white'> Gm, userName! </p>
    </Link>

    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
        <p className='text-white'> Gm, userName! </p>
        </NavigationMenuItem>

      

      </NavigationMenuList>
    </NavigationMenu>

    
    <div>
      <ConnectButton
              client={thirdwebClient}
              wallets={wallets}
              theme={"dark"}
              connectButton={{ label: "Start" }}
              connectModal={{
                size: "compact",
                title: "Birdlypay",
                titleIcon:
                  "https://bafybeidc63fbknjzs5aiedihq5v4rvh6reugfvwflw2wt5booom7dixj2u.ipfs.w3s.link/Birdlypay.png",
                showThirdwebBranding: false,
              }}
              chain={defineChain(baseSepolia)}
              onDisconnect={handleDisconnect}
            />
    </div>

  </header>

  

  )
}
interface IconProps extends React.SVGProps<SVGSVGElement> {}
function MenuIcon(props: IconProps ) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
function SettingsIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function FolderIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}
