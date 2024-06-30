import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import { useActiveAccount } from "thirdweb/react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
}

const UserTransactionsComponent: React.FC = () => {

  const account = useActiveAccount();
  const address = account?.address;
        
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Replace with the actual API endpoint for fetching transactions
        const response = await axios.get(
          `https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc`
        );

        const txs = response.data.result.slice(0, 5).map((tx: any) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: ethers.utils.formatEther(tx.value),
            timeStamp: new Date(tx.timeStamp * 1000).toLocaleString(),
          }));

          console.log('Transactions:', txs);

        setTransactions(txs);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    {/* <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.hash}>
            <strong>Hash:</strong> {tx.hash} <br />
            <strong>From:</strong> {tx.from} <br />
            <strong>To:</strong> {tx.to} <br />
            <strong>Value:</strong> {tx.value} ETH <br />
            <strong>Date:</strong> {tx.timeStamp} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div> */}

        <div className="space-y-4">
        {transactions.map((tx) => (
            <>
                <div  key={tx.hash}>
                  <p className="font-semibold">From: {tx.from}</p>
                  <p className="text-sm text-muted-foreground">Amount: {tx.value} ETH</p>
                  <p className="text-sm text-green-500">Date: {tx.timeStamp}</p>
                </div>
                <hr />
            </>
        ))}
        </div>


    </>
  );
};

export default UserTransactionsComponent;