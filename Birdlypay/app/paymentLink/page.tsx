"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function PaymentLink() {
  const searchParams = useSearchParams();
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  
  useEffect(() => {
    const title = searchParams.get('title');
    const amount = searchParams.get('amount');
    const address = searchParams.get('address');

    if (title && amount && address) {
      const link = `${window.location.origin}/receiverPage?title=${title}&amount=${amount}&address=${address}`;
      setPaymentLink(link);
    }
  }, [searchParams]);
  const router = useRouter(); 

  

  const handleHome = () => {
    router.push('/home'); // Redirects to Homepage.tsx
  }

  type ShareUrl = string;
  const showShareOptions = (whatsappUrl: ShareUrl, telegramUrl: ShareUrl, discordUrl: ShareUrl): void => {
    const option = window.prompt(
      "Choose an option to share:\n1. WhatsApp\n2. Telegram \n3. Discord"
    );
  
    switch(option) {
      case "1":
        window.open(whatsappUrl, '_blank');
        break;
      case "2":
        window.open(telegramUrl, '_blank');
        break;
      case "3":
          window.open(discordUrl, '_blank');
        break;
      default:
        alert("Invalid option or sharing cancelled");
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Link',
          text: 'Here\'s your payment link',
          url: paymentLink,
        });
        console.log('Successful share');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API

      const link: string = paymentLink || '';
      const shareText = `Here's your payment link: ${link}`;

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Here's your payment link: ${paymentLink}`)}`;
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(paymentLink)}&text=${encodeURIComponent("Here's your payment link")}`;
      const discordUrl: ShareUrl = `https://discord.com/channels/@me?message=${encodeURIComponent(shareText)}`;

      showShareOptions(whatsappUrl, telegramUrl, discordUrl);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Payment Link");
    const body = encodeURIComponent(`Here's your payment link: ${paymentLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopy = async () => {
    if (paymentLink) {
      try {
        await navigator.clipboard.writeText(paymentLink);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert("Failed to copy link. Please try again.");
      }
    }
  };

  return (
    
    <div className='container-fluid bg-black pb-24 h-screen'>
      {/* First row */}
      <div className='flex flex-col'>
          <div className="w-1/2">
            <div className='btn-container flex justify-start m-4'>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
                onClick={handleHome}> Back </button>
            </div>
          </div>
          <div className="flex justify-center mt-14">
            <h6 className='text-white text-3xl text-center'> Your PayLink Is Ready </h6>
          </div>
          {paymentLink && (
        <div className="flex justify-center mt-4">
          <p className='text-white text-center break-all'>{paymentLink}</p>
        </div>
      )}
          <div className="flex justify-center mt-4">
            <p className='text-white text-center'> Share your PayLink to get pay of any part of the world via email, QR or other platform </p>
          </div>
      </div>
      <p className='text-white ml-8 mt-8'> Share your paylink via: </p>

      <div className="grid grid-cols-2 gap-4 mx-8 mt-8">
      <div className="grid grid-cols-2 gap-4 mx-8 mt-8">
  <div 
    className="flex py-2 px-4 bg-white rounded-xl cursor-pointer"
    onClick={() => setShowQR(!showQR)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
    </svg>
    <p className="ml-2 font-bold">
      QR Code
    </p>
  </div>
</div>
        <div className="flex py-2 px-4 bg-white rounded-xl cursor-pointer"
        onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          <p className="ml-2 font-bold	">
            Copy
          </p>
        </div>

        <div 
        className="flex items-center py-2 px-4 bg-white rounded-xl cursor-pointer"
        onClick={handleShare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
        <p className="ml-2 font-bold">
          Share
        </p>
        </div>

       <div 
  className="flex items-center py-2 px-4 bg-white rounded-xl cursor-pointer"
  onClick={handleEmailShare}
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
  <p className="ml-2 font-bold">
    Email
  </p>
</div>
      </div>

      {showQR && paymentLink && (
    <div className="mt-4 flex justify-center">
      <div className="bg-white p-4 rounded-xl">
        <QRCodeSVG value={paymentLink} size={200} />
      </div>
    </div>
  )}
  </div>


  );
}