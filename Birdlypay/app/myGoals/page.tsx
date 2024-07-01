"use client"
import { useState, useEffect } from 'react';
import { createThirdwebClient } from "thirdweb";
import { useRouter } from 'next/navigation';
import { ConnectButton } from "thirdweb/react";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

interface Goal {
  id: string;
  title: string;
  amount: string;
  deadline: string;
  address: string;
  currentAmount: number;
}

export default function MyGoals() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    const storedGoals = JSON.parse(localStorage.getItem('goals') || '[]') as Goal[];
    setGoals(storedGoals);
  };

  const handleHome = () => {
    router.push('/home');
  }

  const handleSavings = (goalId: string) => {
    router.push(`/addSavings?goalId=${goalId}`);
  }

  const handleSetNewGoal = () => {
    router.push('/setGoal');
  }

  const readWalletInfo = async (data: any) => {
    console.log("Wallet connected: ", data);
    const account = data.getAccount();
    console.log("Address: ", account?.address);
  }

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  }

  return (
    <div className='flex flex-col bg-dark h-max min-h-screen'>
      {/* First row */}
      <div className='flex flex-col'>
        <div className="w-full flex justify-between p-4">
          <div className='btn-container justify-start m-4'>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-[12px] shadow actor-font"
              onClick={handleHome}> Back </button>
          </div>
          <div className='justify-end m-4'>
            <ConnectButton client={client} onConnect={readWalletInfo} />
          </div>
        </div>
        <div className="w-full flex justify-between items-center px-4">
          <h6 className='text-white text-3xl'> My goals </h6>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSetNewGoal}
          >
            Set a new goal
          </button>
        </div>
        {goals.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-xl">You haven't set a goal yet</p>
          </div>
        ) : (
          <div className="mt-8">
            {goals.map((goal: Goal) => (
              <div key={goal.id} className="bg-white rounded-xl p-4 m-4 relative">
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p>Amount: ${goal.amount}</p>
                <p>Deadline: {goal.deadline}</p>
                <div className="ml-4 mt-4">
                  <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-md"
                    onClick={() => handleSavings(goal.id)}>
                    Add savings
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{width: `${(goal.currentAmount / parseFloat(goal.amount)) * 100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ${goal.currentAmount} / ${goal.amount}
                </p>
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}