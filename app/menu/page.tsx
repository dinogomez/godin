"use client"
import axios from 'axios';
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { useState, useEffect, useReducer } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    
    const [brand, setBrand ] = useState('');
    const [model, setModel ] = useState('');
    const [ignored, forceUpdate] = useReducer(x=> x+1, 0);

    const [data,setData] = useState<any[]>([]);

    const addCar = () => {
        axios({
          method: 'post',
          data: {
            brand: brand,
            model: model
          },
          withCredentials: true,
          url: 'http://localhost:3001/api/post'
        }).then(res => {console.log(res.data);}).catch(res => {console.log(res.data)})
        forceUpdate();
      }


    const loadData = async() => {
        const res =await axios.get("http://localhost:3001/api/get");
        setData(res.data);
    }

    useEffect(()=>{
        loadData();
    }, [ignored]);

  return (

    <div className='flex justify-center items-center mt-5 font-mono  text-neutral-500'>
      <div className='text-center'>
        <div className="text-5xl  text-neutral-600">menu</div>
        <hr  className='my-2 w-48 h-1 mx-auto'/>
      <div className="flex">
      <input className='border my-1 border-neutral-400 px-5 py' type="text" name="loginUsername" id="" placeholder='brand' onChange={e=> setBrand(e.target.value)}/>
        <input className='border my-1 border-neutral-400 px-5 py' type="text" name="loginUsername" id="" placeholder='model' onChange={e=> setModel(e.target.value)}/>
        <hr className='border-neutral-400 my-2' />
            <button className='rounded-sm px-3 mx-2 my-1  bg-green-500 hover:bg-green-700 text-white' onClick={addCar}>Add</button>
      </div>
        <div className="relative overflow-x-auto">
       
        <table className='w-full  text-left text-gray-500'>
            <thead className=' text-neutral-100 bg-neutral-900 uppercase'>
                <tr>
                <th scope="col" className='px-6 py-3'>ID</th>
                <th scope="col" className='px-6 py-3'>Model</th>
                <th scope="col" className='px-6 py-3'>Car</th>
                <th scope="col" className='px-6 py-3'>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item,index)=>{
                    return(
                        <tr className='bg-white border-b' key={item.id}>
                            <td scope="col" className='px-6 py-3'>{index+1}</td>
                            <td scope="col" className='px-6 py-3'>{item.brand}</td>
                            <td scope="col" className='px-6 py-3'>{item.model}</td>
                            <td>
                                <Link href={`/update/${item.id}`}>
                                    <button className='rounded mx-1 px-1 py-1 bg-cyan-500 hover:bg-cyan-700 text-white'>Edit</button>
                                </Link>
                                    <button className='rounded mx-1 px-1 py-1 bg-red-500 hover:bg-red-700 text-white'>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
             </div>
        
      </div>
    </div>
  )
}
