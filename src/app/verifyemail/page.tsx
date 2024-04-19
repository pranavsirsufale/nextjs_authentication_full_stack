'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function page() {

  // const router = useRouter()

  const [token, setToken] = useState('');
  const [ verified, setVerified ] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      const response = await axios(`/api/users/verifyemail/`,{token})
      console.log(response);
      
      setVerified(true)
    } catch (error:any) {
      console.log(error);
      setError(true)
      
    }
  }


  useEffect(()=>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // const { query } = router
    // const urlTokenTwo = query.token 



     
  },[])

  useEffect(()=>{
    if(token.length > 0 ){
      verifyUserEmail()
    }
  },[token])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl' >Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'> 
      {token ? `${token}` : 'no token' }
       </h2>
       { verified && (
        <div>
          <h2> Verified </h2>
          <Link href='/login' > Login</Link>

        </div>
       )}

       
       { error && (
        <div>
          <h2> Error </h2>
          
        </div>
       )}


    </div>
  )
}

export default page