"use client";

import './page.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ethers } from 'ethers';
import {useRouter} from 'next/navigation';

export default function MyProfile() {
    const router = useRouter();
   
    
    
    return (
        <div className='container-fluid bg-black h-screen'>
            <div className='container-fluid flex justify-center align-center profile-container pt-4 bg-white rounded h-screen'>
                <h1 > Welcome </h1>
            </div>
        </div>
    );
}