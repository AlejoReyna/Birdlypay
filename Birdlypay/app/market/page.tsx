"use client";
import './market.css';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Image from "next/image";
import primeVideo from './prime.png';
import x from './x.png';
import { useRouter } from 'next/navigation';

export default function Market() {
    const router = useRouter();

    const handleHome = () => {
        router.push('/home');
      }
    return(
        <>
        <div className="container-fluid h-40 bg-dark">
        
        <div className="grid">
        <div className='btn-container justify-start m-4'>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
          onClick={handleHome}> Back </button>
        </div>
        <div className="flex justify-center">
        <input 
            type="text" 
            className="form-control form-control-lg rounded-2 text-center" 
            placeholder="Search Market"
          />
          <span className="position-absolute top-50 end-0 translate-middle-y pe-3">
            <i className="bi bi-search"></i>
          </span>
        </div>
        </div>
        
        </div>  
        
        <div className="container-fluid h-60 bg-white">
            <div className='flex justify-center text-center m-5'>
                <p> With <span className="font-bold"> Birdly market</span> you will access exclusive content, an annual membership discount for your favorite streaming services, everything, paying with your crypto. </p>
            </div>

            <div className='flex'>
                <div className="w-60 rounded-lg overflow-hidden shadow-lg m-2">
                    {/* Imagen de fondo */}
                    <div className="relative">
                        <Image src={primeVideo} alt='Prime video image'/>
                    </div>
      
                        {/* Contenido de la tarjeta */}
                    <div className="p-4">
                            <h3 className="text-xl font-bold">AMAZON PRIME</h3>
                            <p className="text-gray-600 mt-2">Try a week with <span className="font-bold">prime video</span></p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-blue-500 font-bold line-through">0.0004 ETH</span>
                            <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded">
                                FREE
                            </button>
                        </div>
                    </div>
            </div>
            
            <div className='flex'>
      <div className="w-60 rounded-lg overflow-hidden shadow-lg m-2">
       {/* Imagen de fondo */}
       <div className="relative">
        <Image src={x} alt='X image'/>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="text-xl font-bold">X PREMIUM GOLD</h3>
        <p className="text-gray-600 mt-2"> Pay <span className="font-bold">3 months</span> with crypto.</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-blue-500 font-bold">0.0020 ETH</span>
          
        </div>
      </div>
      </div>
      </div>
    </div>
            </div>


        
        </>
    );
}