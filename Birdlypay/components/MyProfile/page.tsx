"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ethers } from 'ethers';

export default function MyProfile() {
    return (
        <div className='container-fluid bg-black h-screen'>
            <div className='container-fluid rounded'>
                <h1> Bienvenido </h1>
            </div>
        </div>
    );
}