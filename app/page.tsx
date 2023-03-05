"use client"
import axios from 'axios';
import { Inter } from 'next/font/google'
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (

    <div className='flex justify-center items-center h-screen font-mono text-neutral-500'>
      <p className='text-center'>
        <div className="text-5xl font-bold text-neutral-800">godin-core</div>
        <hr  className='my-2 w-48 h-1 mx-auto'/>
        <div className="mt text-xs italic">library-recital port to javascript</div>
      </p>
    </div>
  )
}
