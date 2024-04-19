'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function ProfilePage() {

  const router = useRouter()
  const [data, setData] = useState('nothing')
  console.log(data);
  

  const getUserDetails = async () => {
    try {
      const response = await axios.post(`/api/users/me`)
      console.log(response);
      setData(response.data)
      if(response?.data){
        toast.success('user fetched successfully ')
        setData(response.data.data._id)
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.message)
    }
  }


  const logout= async () => {
    try {
      const response = await axios.post(`/api/users/logout`)
      console.log('LOGOUT RESPONSE HERE :: ', response);
      toast.success('Logout successfully')
      router.push('/login')
      
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  // useEffect(()=>{
  //   getUserDetails()
  // },[])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2' >
      <h1> Profile Page </h1>

      <h2> { data === 'nothing' ? 'nothing': <Link href={`/profile/${data}`} > 
      {data}
      </Link> } </h2>

      <hr />

      <button
      className='bg-blue-600 mt-4 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'
      onClick={logout} >
        logout
      </button>

      <button
      className='bg-green-600 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 rounded'
      onClick={getUserDetails} >
        get user
      </button>

    </div>
  )
}

