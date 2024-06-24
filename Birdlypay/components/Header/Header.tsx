"use client"

import './Header.css';

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { NavigationMenuLink, NavigationMenuItem, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from 'next/navigation';


import { thirdwebClient } from "../../utils/thirdweb";
import { baseSepolia, defineChain } from "thirdweb/chains";

import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";

import { useConnect,  } from "thirdweb/react";
import { useConnectedWallets } from "thirdweb/react";
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

export default function HeaderComponent() {

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

  return (
    <header className="sticky bg-white top-0 z-50 flex items-center justify-between px-8 py-4 rounded-2xl shadow-xl border-1 border-black">

    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-64" side="left">
        <nav className="grid gap-2 py-4">

          <Link className="flex items-center gap-2" href="/">
            <Image src={"/logo1.png"} alt="Birdlypay" 
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: 'auto', height: '50px', margin: '5px'}}
            />
          </Link>

      {(wallets.length>0) ? (
        <>
          <Link
            className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
            href="/page1"
          >
            <FolderIcon className="h-5 w-5" />
            Page 1
          </Link>
          <Link
            className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
            href="/page2"
          >
            <SettingsIcon className="h-5 w-5" />
            Page 2
          </Link>
          </>
      ): null}


        </nav>
      </SheetContent>
    </Sheet>

    <Link className="items-center gap-2 hidden lg:flex" href="/">
      <Image src={"/logo1.png"} alt="Birdlypay" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '50px', margin: '5px'}}
      />
    </Link>

    <Link className="items-center gap-2 flex lg:hidden" href="/">
      <Image src={"/birdlypay.png"} alt="Birdlypay" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: '40px', margin: '5px'}}
      />
    </Link>

    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

      { (wallets.length>0) ? (
        <>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/page1"
          >
            Page 1
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/page2"
          >
            Page2
          </NavigationMenuLink>
        </NavigationMenuItem>
        </>
      ): null}

      </NavigationMenuList>
    </NavigationMenu>

    <div>
    <button className="actor-font" 
      onClick={handleProfile}> Button </button>
    </div>
    <div>
      <ConnectButton
              client={thirdwebClient}
              wallets={wallets}
              theme={"light"}
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
