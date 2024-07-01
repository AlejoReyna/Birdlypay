"use client"
import { useState, useEffect } from 'react';
import { createThirdwebClient } from "thirdweb";
import { useRouter, useSearchParams } from 'next/navigation';
import { ConnectButton } from "thirdweb/react";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});


const AddSavingComponent: React.FC = () => {

    const [amount, setAmount] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const goalId = searchParams.get('goalId');
  
    const readWalletInfo = async (data) => {
      console.log("Wallet connected: ", data);
      const account = data.getAccount();
      console.log("Address: ", account?.address);
    }
  
    const handleGoals = () => {
      router.push('/myGoals');
    }
  
    const handleAddSavings = () => {
      if (!goalId) return;
  
      const goals = JSON.parse(localStorage.getItem('goals') || '[]');
      const updatedGoals = goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            currentAmount: goal.currentAmount + parseFloat(amount)
          };
        }
        return goal;
      });
  
      localStorage.setItem('goals', JSON.stringify(updatedGoals));
      router.push('/myGoals');
    }
  

return(
    <div className='flex flex-col bg-dark h-max min-h-screen'>
      {/* First row */}
      <div className='flex flex-col'>
        <div className="w-full flex justify-between p-4">
          <div className='btn-container justify-start m-4'>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
              onClick={handleGoals}> Back </button>
          </div>
          <div className='justify-end m-4'>
            <ConnectButton client={client} onConnect={readWalletInfo} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center px-4">
          <h6 className='text-white text-3xl'> Add funds </h6>
        </div>
        <div className="flex justify-between items-center mx-8 mt-4 px-4 py-1 bg-white rounded-xl">
          <div className="flex items-center">
            <p className="mr-2"> $ </p>
            <input
              style={{ width: '80%', outline: 'none' }}
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='p-2'
            />
          </div>
          <p> USD </p>
        </div>
        <div className="flex justify-center mt-8 mb-20">
          <button 
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md"
            onClick={handleAddSavings}
          >
            Add savings
          </button>
        </div>
      </div>
    </div>

)

}

export default AddSavingComponent;