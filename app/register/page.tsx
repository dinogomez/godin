"use client"


import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [registerUsername, setRegisterUsername ] = useState('');
  const [registerPassword, setRegisterPassword ] = useState('');
  const [status, setStatus] = useState('');

  const colors = {
    success: "text-green-600",
    danger: "text-red-600"
  }

  const register = () => {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:3001/register'
    }).then(res => {setStatus(res.data.message); console.log(res)}).catch(res => {setStatus(res.data.message)})
  }

    return(
      
        <div className='flex justify-center items-center h-screen font-mono text-neutral-500 grid'>
     
        <div className="border border-neutral-400 m-auto p-5">
        <h1 className='text-center pb-2 '>://add-user</h1>
        <div className="grid">
        <h1 className={status==="User Created!"? 'text-center pb-2 text-green-600' : 'text-center pb-2 text-red-600'}>{status}</h1>
        <input className='border my-1 border-neutral-400 p-1' type="text" name="loginUsername" id="" placeholder='username' onChange={e=> setRegisterUsername(e.target.value)}/>
        <input className='border my-1 border-neutral-400 p-1' type="password" name="loginUsername" id="" placeholder='********' onChange={e=> setRegisterPassword(e.target.value)}/>
        <hr className='border-neutral-400 my-2' />
        <button className='border border-neutral-400 p-1 hover:bg-neutral-700 hover:text-neutral-50' onClick={register}>add</button>
        </div>
       

      </div>
    </div>
    );
  }
  