"use client"
import axios from 'axios';
import { Inter } from 'next/font/google'
import { useReducer, useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
  const [loginUsername, setLoginUsername ] = useState('');
  const [loginPassword, setLoginPassword ] = useState('');
  const [isLogin, setIsLogin] = useState('');
  const login = () =>{
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword, 
      },
      withCredentials: true,
      url: "http://localhost:3001/login"
    }).then(res => console.log(res)).catch(err => console.log(err));
  }

  return (

    <div className='flex justify-center items-center h-screen font-mono text-neutral-500 grid'>

      <div className="border border-neutral-400 m-auto p-5">
        <h1 className='text-center pb-2 '>://godin-core</h1>
        <div className="grid">
        <input className='border my-1 border-neutral-400 p-1' type="text" name="loginUsername" id="" placeholder='username' onChange={e=> setLoginUsername(e.target.value)}/>
        <input className='border my-1 border-neutral-400 p-1' type="password" name="loginPassword" id="" placeholder='********' onChange={e=> setLoginPassword(e.target.value)}/>
        <hr className='border-neutral-400 my-2' />
        <button className='border border-neutral-400 p-1 hover:bg-neutral-700 hover:text-neutral-50' onClick={login}>login</button>
        </div>
       

      </div>
    </div>
  )
}
